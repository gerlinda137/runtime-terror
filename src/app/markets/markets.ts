import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BinanceWsService } from '../core/services/binanceWsService/binanceWsService';
import { PublicApi } from '../core/services/publickApiService/publickApiService';
import { WatchlistStore } from '../core/store/watchlist.store';
import { Router } from '@angular/router';
import { combineLatest, Subject, takeUntil, auditTime } from 'rxjs';
import { MarketRow, SortColumn, SortDir } from './markets-table/market-row.model';
import { SymbolInfo, Ticker } from '../core/models';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MarketsTable } from './markets-table/markets-table';
import { SearchStore } from '../core/store/search.store';

type QuoteFilter = 'ALL' | 'USDT' | 'BTC' | 'ETH';

@Component({
  selector: 'app-markets',
  imports: [MatButtonToggleModule, MarketsTable],
  templateUrl: './markets.html',
  styleUrl: './markets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Markets implements OnInit, OnDestroy {
  private readonly ws = inject(BinanceWsService);
  private readonly api = inject(PublicApi);
  private readonly watchlistStore = inject(WatchlistStore);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly searchStore = inject(SearchStore);

  private readonly destroy$ = new Subject<void>();

  private readonly PAGE_SIZE = 50;
  pageSize = this.PAGE_SIZE;
  fullRows: MarketRow[] = [];

  // A fixed list of major pairs to keep individually live-updating,
  // since Testnet's !ticker@arr stream doesn't reliably send data.
  private readonly PRIORITY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'];

  //FILTER/SORT STATE
  activeTab: QuoteFilter = 'ALL';
  sortColumn: SortColumn | null = null;
  sortDir: SortDir = null;
  readonly tabs: readonly QuoteFilter[] = ['ALL', 'USDT', 'BTC', 'ETH'];

  displayedRows: MarketRow[] = [];

  //caches
  private readonly symbolMap = new Map<string, SymbolInfo>();
  private readonly tickerMap = new Map<string, Ticker>();

  private readonly searchEffect = effect(() => {
    this.searchStore.query();
    this.pageSize = this.PAGE_SIZE;
    this.rebuild();
  });

  ngOnInit(): void {
    this.loadSymbols();
    this.subscribeToLiveData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //event handlers
  onTabChange(tab: QuoteFilter): void {
    this.activeTab = tab;
    this.pageSize = this.PAGE_SIZE;
    this.rebuild();
  }

  onSortChange(event: { column: SortColumn; dir: SortDir }): void {
    this.sortColumn = event.dir ? event.column : null;
    this.sortDir = event.dir;
    this.rebuild();
  }

  onFavToggle(symbol: string): void {
    this.watchlistStore.toggle(symbol);
  }

  onRowClick(symbol: string): void {
    this.router.navigate(['/trade', symbol]);
  }

  onLoadMore(): void {
    this.pageSize += this.PAGE_SIZE;
    this.displayedRows = this.fullRows.slice(0, this.pageSize);
  }

  //data loading
  private loadSymbols() {
    this.api
      .getExchangeInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        info.symbols
          .filter((s) => s.status === 'TRADING')
          .forEach((s) => this.symbolMap.set(s.symbol, s));
        this.rebuild();
      });
  }

  private subscribeToLiveData(): void {
    const allTickers$ = this.ws.subscribeToAllTickers();

    const individualTickers$ = this.PRIORITY_SYMBOLS.map((symbol) =>
      this.ws.subscribeToTicker(symbol),
    );

    combineLatest([allTickers$, this.watchlistStore.watchlist$])
      .pipe(auditTime(1000), takeUntil(this.destroy$))
      .subscribe(([tickers, watchlist]) => {
        tickers.forEach((t) => this.tickerMap.set(t.s, t));
        this.rebuild(watchlist);
      });

    individualTickers$.forEach((ticker$) => {
      ticker$.pipe(takeUntil(this.destroy$)).subscribe((ticker) => {
        this.tickerMap.set(ticker.s, ticker);
        this.rebuild();
      });
    });
  }

  //row building
  private rebuild(watchlist?: Set<string>) {
    const wl = watchlist ?? this.watchlistStore.snapshot;

    let rows = this.buildRows(wl);

    rows = this.applyTabFilter(rows);
    rows = this.applySearchFilter(rows);
    rows = this.applySort(rows);

    this.displayedRows = rows.slice(0, this.pageSize);
    this.fullRows = rows;
    this.cdr.markForCheck();
  }

  private buildRows(watchlist: Set<string>): MarketRow[] {
    const rows: MarketRow[] = [];

    this.symbolMap.forEach((info, symbol) => {
      const ticker = this.tickerMap.get(symbol);

      const price = ticker ? parseFloat(ticker.c) : 0;

      rows.push({
        symbol,
        baseAsset: info.baseAsset,
        quoteAsset: info.quoteAsset,
        price,
        priceDisplay: this.formatPrice(price, info.quoteAsset),
        change24h: ticker ? parseFloat(ticker.P) : 0,
        volume24h: ticker ? parseFloat(ticker.q) : 0,
        isFavourite: watchlist.has(symbol),
      });
    });

    return rows;
  }

  private formatPrice(price: number, quote: string): string {
    return quote === 'BTC' ? price.toFixed(8) : price.toFixed(2);
  }

  private applyTabFilter(rows: MarketRow[]): MarketRow[] {
    if (this.activeTab === 'ALL') return rows;
    return rows.filter((r) => r.quoteAsset === this.activeTab);
  }

  private applySearchFilter(rows: MarketRow[]): MarketRow[] {
    const query = this.searchStore.query().trim().toUpperCase();
    if (!query) return rows;
    return rows.filter((r) => r.symbol.includes(query));
  }

  private applySort(rows: MarketRow[]): MarketRow[] {
    if (!this.sortColumn || !this.sortDir) return rows;

    const column = this.sortColumn;
    const dir = this.sortDir === 'asc' ? 1 : -1;

    return [...rows].sort((a, b) => ((a[column] as number) - (b[column] as number)) * dir);
  }
}

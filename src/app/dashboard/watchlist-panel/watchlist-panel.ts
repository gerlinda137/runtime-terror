import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Typography } from '../../shared/directive';
import { ChangeColor } from '../../shared/directive/market-display/change-color';
import { ChangeHourPipe } from '../../shared/pipes/market-display/change-hour.pipe';
import { SymbolPipe } from '../../shared/pipes/market-display/symbol.pipe';
import { BinanceWsService } from '../../core/services/binanceWsService/binanceWsService';
import { PublicApi } from '../../core/services/publickApiService/publickApiService';
import { SymbolInfo, Ticker } from '../../core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, merge, tap } from 'rxjs';
import { CryptoToken } from '../shared/crypto.model';
import { WatchlistStore } from '../../core/store/watchlist-store/watchlist.store';
import { formatPrice } from '../../shared/market-utils/fromat-price';

@Component({
  selector: 'app-watchlist-panel',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    Typography,
    SymbolPipe,
    ChangeHourPipe,
    ChangeColor,
  ],
  templateUrl: './watchlist-panel.html',
  styleUrls: ['./watchlist-panel.scss'],
})
export class WatchlistPanel implements OnInit {
  displayedColumns = ['symbol', 'priceDisplay', 'change24h', 'actions'];
  private readonly PRIORITY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'];

  private readonly ws = inject(BinanceWsService);
  private readonly api = inject(PublicApi);
  private readonly router = inject(Router);
  private readonly watchlistStore = inject(WatchlistStore);
  private readonly destroyRef = inject(DestroyRef);

  private readonly symbolMap = new Map<string, SymbolInfo>();
  private readonly tickerMap = new Map<string, Ticker>();

  rows = signal<CryptoToken[]>([]);

  constructor() {
    effect(() => {
      this.rows();
    });
  }

  ngOnInit(): void {
    this.api
      .getExchangeInfo()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((info) => {
        info.symbols
          .filter((s) => s.status === 'TRADING')
          .forEach((s) => this.symbolMap.set(s.symbol, s));

        this.rebuild();
      });

    this.subscribeToLiveData();

    this.watchlistStore.watchlist$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((watchlist) => this.rebuild(watchlist));
  }

  private subscribeToLiveData(): void {
    const allTickers$ = this.ws
      .subscribeToAllTickers()
      .pipe(tap((tickers) => tickers.forEach((t) => this.tickerMap.set(t.s, t))));

    const individualTickers$ = merge(
      ...this.PRIORITY_SYMBOLS.map((symbol) => this.ws.subscribeToTicker(symbol)),
    ).pipe(tap((t) => this.tickerMap.set(t.s, t)));

    merge(allTickers$, individualTickers$)
      .pipe(auditTime(1000), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.rebuild());
  }

  private rebuild(watchlist?: Set<string>): void {
    const wl = watchlist ?? this.watchlistStore.snapshot;
    const rows: CryptoToken[] = [];

    Array.from(wl).forEach((symbol) => {
      const info = this.symbolMap.get(symbol);
      const ticker = this.tickerMap.get(symbol);
      const price = ticker ? parseFloat(ticker.c) : 0;
      const change24h = ticker ? parseFloat(ticker.P) : 0;
      const volume = ticker ? parseFloat(ticker.q) : 0;

      rows.push({
        symbol,
        name: info?.baseAsset ?? symbol,
        price,
        priceDisplay: ticker && info ? formatPrice(price, info.quoteAsset) : 'Loading',
        change24h,
        volume,
        isFavourite: true,
      });
    });

    this.rows.set(rows);
  }

  onRemove(event: Event, symbol: string): void {
    event.stopPropagation();
    this.watchlistStore.toggle(symbol);
  }

  onRowClick(symbol: string): void {
    this.router.navigate(['/trade', symbol]);
  }

  trackBySymbol(index: number, row: CryptoToken): string {
    return row.symbol;
  }
}

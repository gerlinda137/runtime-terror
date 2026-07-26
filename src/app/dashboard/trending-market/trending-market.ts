import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { Typography } from '../../shared/directive';
import { ChangeColor } from '../../shared/directive/market-display/change-color';
import { CryptoIcon } from '../../shared/directive/market-display/crypto-icon';
import { ChangeHourPipe } from '../../shared/pipes/market-display/change-hour.pipe';
import { SymbolPipe } from '../../shared/pipes/market-display/symbol.pipe';
import { ROUTES } from '../../shared/constants/routes.constant';
import { Router, RouterLink } from '@angular/router';
import { BinanceWsService } from '../../core/services/binanceWsService/binanceWsService';
import { PublicApi } from '../../core/services/publickApiService/publickApiService';
import { SymbolInfo, Ticker } from '../../core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, merge, tap } from 'rxjs';
import { CryptoToken } from '../shared/crypto.model';
import { WatchlistStore } from '../../core/store/watchlist-store/watchlist.store';
import { MatIcon } from '@angular/material/icon';
import { formatPrice } from '../../shared/market-utils/fromat-price';
import { createPriceFlash } from '../../shared/price-flash/price-flash.util';
import { FormatVolumePipe } from '../../shared/pipes/market-display/format-volume-pipe';

@Component({
  selector: 'app-trending-market',
  imports: [
    MatTableModule,
    Typography,
    SymbolPipe,
    ChangeHourPipe,
    ChangeColor,
    CryptoIcon,
    RouterLink,
    MatIcon,
    NgClass,
    FormatVolumePipe
  ],
  templateUrl: './trending-market.html',
  styleUrl: './trending-market.scss',
})
export class TrendingMarket implements OnInit {
  displayedColumns = ['name', 'symbol', 'priceDisplay', 'change24h', 'volume', 'favourite'];
  private readonly PRIORITY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'];
  protected readonly marketsLink = `/${ROUTES.MARKETS}`;

  private readonly ws = inject(BinanceWsService);
  private readonly api = inject(PublicApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly watchlistStore = inject(WatchlistStore);
  private readonly router = inject(Router);

  private readonly TOP_N = 5;
  //cache
  private readonly symbolMap = new Map<string, SymbolInfo>();
  private readonly tickerMap = new Map<string, Ticker>();

  //price flashing
  private readonly priceFlash = createPriceFlash<CryptoToken>();
  flashingSymbols = this.priceFlash.flashingSymbols;

  rows = signal<CryptoToken[]>([]);

  constructor() {
    effect(() => {
      this.priceFlash.detect(this.rows());
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
      .subscribe((wl) => this.rebuild(wl));
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

    this.symbolMap.forEach((info, symbol) => {
      const ticker = this.tickerMap.get(symbol);
      if (!ticker) return;

      const price = parseFloat(ticker.c);

      rows.push({
        symbol,
        name: info.baseAsset,
        price,
        priceDisplay: formatPrice(price, info.quoteAsset),
        change24h: parseFloat(ticker.P),
        volume: parseFloat(ticker.q),
        isFavourite: wl.has(symbol),
      });
    });

    rows.sort((a, b) => b.volume - a.volume);
    this.rows.set(rows.slice(0, this.TOP_N));
  }

  onFavClick(event: Event, symbol: string): void {
    event.stopPropagation();
    this.watchlistStore.toggle(symbol);
  }

  trackBySymbol(index: number, row: CryptoToken): string {
    return row.symbol;
  }

  onRowClick(symbol:string){
    this.router.navigate(['/trade',symbol]);
  }
}

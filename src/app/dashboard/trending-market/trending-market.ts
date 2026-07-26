import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { Typography } from '../../shared/directive';
import { ChangeColor, CryptoIcon } from '../shared/directive';
import { ChangeHourPipe, SymbolPipe } from '../shared/pipes';
import { ROUTES } from '../../shared/constants/routes.constant';
import { RouterLink } from '@angular/router';
import { BinanceWsService } from '../../core/services/binanceWsService/binanceWsService';
import { PublicApi } from '../../core/services/publickApiService/publickApiService';
import { SymbolInfo, Ticker } from '../../core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { formatPrice } from '../../markets/markets-row.utils';
import { auditTime, merge, tap } from 'rxjs';


@Component({
  selector: 'app-trending-market',
  imports: [
    MatTableModule,
    Typography,
    SymbolPipe,
    CurrencyPipe,
    ChangeHourPipe,
    ChangeColor,
    CryptoIcon,
    RouterLink,
  ],
  templateUrl: './trending-market.html',
  styleUrl: './trending-market.scss',
})
export class TrendingMarket implements OnInit {
  displayedColumns = ['name', 'symbol', 'priceDisplay', 'change24h','volume'];
  private readonly PRIORITY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'];
  protected readonly marketsLink = `/${ROUTES.MARKETS}`;

  private readonly ws = inject(BinanceWsService);
  private readonly api = inject(PublicApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly TOP_N = 5;
  //cache
  private readonly symbolMap = new Map<string, SymbolInfo>();
  private readonly tickerMap = new Map<string, Ticker>();

  rows = signal<TrendingRow[]>([]);

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
  }

  private subscribeToLiveData(): void {
    const allTickers$ = this.ws
      .subscribeToAllTickers()
      .pipe(tap((tickers) => tickers.forEach((t) => this.tickerMap.set(t.s, t))));

    const individualTickers$ = merge(
      ...this.PRIORITY_SYMBOLS.map((symbol) => this.ws.subscribeToTicker(symbol)),
    ).pipe(tap((t) => this.tickerMap.set(t.s, t)));

    merge(allTickers$,individualTickers$)
    .pipe(auditTime(1000),takeUntilDestroyed(this.destroyRef))
    .subscribe(()=> this.rebuild())
  }

  private rebuild(): void {
    const rows: TrendingRow[] = [];

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
      });
    });

    rows.sort((a, b) => b.volume - a.volume);
    this.rows.set(rows.slice(0, this.TOP_N));
  }
}

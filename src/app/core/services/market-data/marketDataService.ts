import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { auditTime, merge, tap } from 'rxjs';
import { BinanceWsService } from '../binanceWsService/binanceWsService';
import { PublicApi } from '../publickApiService/publickApiService';
import { WatchlistStore } from '../../store/watchlist-store/watchlist.store';
import { SymbolInfo, Ticker } from '../../models';
import { MarketAsset } from '../../models/market-asset.model';
import { formatPrice } from '../../../shared/market-utils/fromat-price';

// Testnet's !ticker@arr stream doesn't reliably send every pair,
// so these majors are also subscribed to individually.
const PRIORITY_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT'] as const;

@Injectable({ providedIn: 'root' })
export class MarketDataService {
  private readonly ws = inject(BinanceWsService);
  private readonly api = inject(PublicApi);
  private readonly watchlistStore = inject(WatchlistStore);

  private readonly rawSymbolMap = new Map<string, SymbolInfo>();
  private readonly rawTickerMap = new Map<string, Ticker>();

  private readonly symbolMap = signal<ReadonlyMap<string, SymbolInfo>>(new Map());
  private readonly tickerMap = signal<ReadonlyMap<string, Ticker>>(new Map());

  private readonly watchlist = toSignal(this.watchlistStore.watchlist$, {
    initialValue: this.watchlistStore.snapshot,
  });

  readonly isLoading = signal(true);

  readonly rows = computed<MarketAsset[]>(() => {
    const symbols = this.symbolMap();
    const tickers = this.tickerMap();
    const watchlist = this.watchlist();
    const rows: MarketAsset[] = [];

    symbols.forEach((info, symbol) => {
      const ticker = tickers.get(symbol);
      const price = ticker ? parseFloat(ticker.c) : 0;

      rows.push({
        symbol,
        baseAsset: info.baseAsset,
        quoteAsset: info.quoteAsset,
        price,
        priceDisplay: formatPrice(price, info.quoteAsset),
        change24h: ticker ? parseFloat(ticker.P) : 0,
        volume: ticker ? parseFloat(ticker.q) : 0,
        isFavourite: watchlist.has(symbol),
        hasLiveData: !!ticker,
      });
    });

    return rows;
  });

  readonly rowsBySymbol = computed<ReadonlyMap<string, MarketAsset>>(
    () => new Map(this.rows().map((row) => [row.symbol, row])),
  );

  constructor() {
    this.loadSymbols();
    this.subscribeToLiveTickers();
  }

  private loadSymbols(): void {
    this.api.getExchangeInfo().subscribe((info) => {
      info.symbols
        .filter((s) => s.status === 'TRADING')
        .forEach((s) => this.rawSymbolMap.set(s.symbol, s));

      this.symbolMap.set(new Map(this.rawSymbolMap));
      this.isLoading.set(false);
    });
  }

  private subscribeToLiveTickers(): void {
    const allTickers$ = this.ws
      .subscribeToAllTickers()
      .pipe(tap((tickers) => tickers.forEach((t) => this.rawTickerMap.set(t.s, t))));

    const individualTickers$ = merge(
      ...PRIORITY_SYMBOLS.map((symbol) => this.ws.subscribeToTicker(symbol)),
    ).pipe(tap((t) => this.rawTickerMap.set(t.s, t)));

    merge(allTickers$, individualTickers$)
      .pipe(auditTime(1000))
      .subscribe(() => this.tickerMap.set(new Map(this.rawTickerMap)));
  }
}

import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Typography } from '../../shared/directive';
import { ChangeColor } from '../../shared/directive/market-display/change-color';
import { CryptoIcon } from '../../shared/directive/market-display/crypto-icon';
import { ChangeHourPipe } from '../../shared/pipes/market-display/change-hour.pipe';
import { FormatVolumePipe } from '../../shared/pipes/market-display/format-volume-pipe';
import { ROUTES } from '../../shared/constants/routes.constant';
import { WatchlistStore } from '../../core/store/watchlist-store/watchlist.store';
import { MarketDataService } from '../../core/services/market-data/marketDataService';
import { CryptoToken } from '../shared/crypto.model';
import { createPriceFlash } from '../../shared/price-flash/price-flash.util';

const TOP_N = 5;

@Component({
  selector: 'app-trending-market',
  imports: [
    MatTableModule,
    Typography,
    ChangeHourPipe,
    ChangeColor,
    CryptoIcon,
    RouterLink,
    MatIcon,
    NgClass,
    FormatVolumePipe,
  ],
  templateUrl: './trending-market.html',
  styleUrl: './trending-market.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TrendingMarket {
  protected readonly displayedColumns = [
    'pair',
    'price',
    'change24h',
    'volume24h',
    'favourite',
  ];
  protected readonly marketsLink = `/${ROUTES.MARKETS}`;

  private readonly router = inject(Router);
  private readonly watchlistStore = inject(WatchlistStore);
  private readonly marketData = inject(MarketDataService);

  private readonly priceFlash = createPriceFlash<CryptoToken>();
  protected readonly flashingSymbols = this.priceFlash.flashingSymbols;

  protected readonly rows = computed<CryptoToken[]>(() =>
    this.marketData
      .rows()
      .filter((asset) => asset.hasLiveData)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, TOP_N)
      .map((asset) => ({
        symbol: asset.symbol,
        name: asset.baseAsset,
        quoteAsset: asset.quoteAsset,
        price: asset.price,
        priceDisplay: asset.priceDisplay,
        change24h: asset.change24h,
        volume: asset.volume,
        isFavourite: asset.isFavourite,
      })),
  );

  constructor() {
    effect(() => {
      this.priceFlash.detect(this.rows());
    });
  }

  protected onFavClick(event: Event, symbol: string): void {
    event.stopPropagation();
    this.watchlistStore.toggle(symbol);
  }

  protected onRowClick(symbol: string): void {
    this.router.navigate(['/trade', symbol]);
  }

  protected trackBySymbol(index: number, row: CryptoToken): string {
    return row.symbol;
  }
}

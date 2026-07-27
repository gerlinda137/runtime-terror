import { Component, computed, effect, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Typography } from '../../shared/directive';
import { ChangeColor } from '../../shared/directive/market-display/change-color';
import { ChangeHourPipe } from '../../shared/pipes/market-display/change-hour.pipe';
import { WatchlistStore } from '../../core/store/watchlist-store/watchlist.store';
import { MarketDataService } from '../../core/services/market-data/marketDataService';
import { CryptoToken } from '../shared/crypto.model';
import { createPriceFlash } from '../../shared/price-flash/price-flash.util';

@Component({
  selector: 'app-watchlist-panel',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    Typography,
    ChangeHourPipe,
    ChangeColor,
    NgClass,
  ],
  templateUrl: './watchlist-panel.html',
  styleUrls: ['./watchlist-panel.scss'],
})
export class WatchlistPanel {
  protected readonly displayedColumns = ['symbol', 'priceDisplay', 'change24h', 'actions'];

  private readonly router = inject(Router);
  private readonly watchlistStore = inject(WatchlistStore);
  private readonly marketData = inject(MarketDataService);

  private readonly watchlist = toSignal(this.watchlistStore.watchlist$, {
    initialValue: this.watchlistStore.snapshot,
  });

  private readonly priceFlash = createPriceFlash<CryptoToken>();
  protected readonly flashingSymbols = this.priceFlash.flashingSymbols;

  protected readonly rows = computed<CryptoToken[]>(() => {
    const assetsBySymbol = this.marketData.rowsBySymbol();

    return Array.from(this.watchlist()).map((symbol) => {
      const asset = assetsBySymbol.get(symbol);

      return {
        symbol,
        name: asset?.baseAsset ?? symbol,
        quoteAsset: asset?.quoteAsset ?? '',
        price: asset?.price ?? 0,
        priceDisplay: asset?.hasLiveData ? asset?.priceDisplay : '—',
        change24h: asset?.change24h ?? 0,
        volume: asset?.volume ?? 0,
        isFavourite: true,
      };
    });
  });

  constructor() {
    effect(() => {
      this.priceFlash.detect(this.rows());
    });
  }

  protected onRemove(event: Event, symbol: string): void {
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
import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { KeyStore } from '../core/store/key';
import { Crypto } from '../core/services/crypto/crypto';
import { combineLatest, EMPTY, filter, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Typography } from '../shared/directive/typography/typography';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Distribution, DistItem } from './distribution/distribution';
import { Loader } from '../shared/ui/loader/loader';
import { MarketDataService } from '../core/services/market-data/marketDataService';

interface Balance {
  asset: string;
  free: string;
  locked: string;
}

interface AssetRow {
  asset: string;
  available: number;
  inOrder: number;
  price: number; //in usd
  value: number; // (available + inOrder) * price
}

const STABLES = new Set(['USDT', 'USDC', 'TUSD', 'FDUSD', 'USDP', 'USDE', 'USD1', 'AEUR', 'EURI']);
const TOP_ASSETS = 6;

@Component({
  selector: 'app-portfolio',
  imports: [
    Typography,
    CurrencyPipe,
    DecimalPipe,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    Distribution,
    Loader,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  private keyStore = inject(KeyStore);
  private crypto = inject(Crypto);
  private marketData = inject(MarketDataService);
  private destroyRef = inject(DestroyRef);
  displayedColumns = ['asset', 'available', 'inOrder', 'price', 'value'];

  accountBalances = signal<Balance[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  rows = computed<AssetRow[]>(() => {
    const balances = this.accountBalances();
    const livePrices = this.marketData.rowsBySymbol();

    if (balances.length === 0) return [];

    return balances.map((b) => {
      const available = Number(b.free);
      const inOrder = Number(b.locked);
      let price = 0;
      if (STABLES.has(b.asset)) {
        price = 1;
      } else {
        const assetData = livePrices.get(b.asset + 'USDT');
        if (assetData) price = assetData.price;
      }
      return {
        asset: b.asset,
        available,
        inOrder,
        price,
        value: (available + inOrder) * price,
      };
    }).sort((a, b) => b.value - a.value);
  });

  totalValue = computed(() => {
    return this.rows().reduce((sum, r) => sum + r.value, 0);
  });

  pageIndex = signal(0);
  pageSize = signal(10);
  pageSizeOptions = [10, 25, 50];

  pagedRows = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.rows().slice(start, start + this.pageSize());
  });

  onPage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  distribution = computed<DistItem[]>(() => {
    const total = this.totalValue();
    if (total <= 0) return [];

    const withValue = this.rows().filter((r) => r.value > 0);

    const items: DistItem[] = withValue.slice(0, TOP_ASSETS).map((r) => ({
      asset: r.asset,
      value: r.value,
      percent: (r.value / total) * 100,
    }));

    const restValue = withValue.slice(TOP_ASSETS).reduce((sum, r) => sum + r.value, 0);
    if (restValue > 0) {
      items.push({ asset: 'Other', value: restValue, percent: (restValue / total) * 100 });
    }

    return items;
  });

  ngOnInit() {
    this.keyStore.loadKeys();

    combineLatest([this.keyStore.keys$, this.keyStore.loading$])
      .pipe(
        filter(([, isLoading]) => !isLoading),
        take(1),
        switchMap(([keys]) => {
          if (keys.length === 0) {
            this.loading.set(false);
            return EMPTY;
          }
          return this.crypto.getAccount(keys[0].id);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (account) => {
          const balances = (account.balances as Balance[] || []).filter((b) => Number(b.free) > 0 || Number(b.locked) > 0);
          this.accountBalances.set(balances);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
          const errMsg = err.error?.message || err.message || 'Unknown error';
          this.error.set(`Failed to load portfolio data. (${errMsg})`);
        },
      });
  }
}

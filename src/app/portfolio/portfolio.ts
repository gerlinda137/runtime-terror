import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { KeyStore } from '../core/store/key';
import { Crypto } from '../core/services/crypto/crypto';
import { combineLatest, filter, map, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Typography } from '../shared/directive/typography/typography';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BinanceWsService } from '../core/services/binanceWsService/binanceWsService';
import { Distribution, DistItem } from './distribution/distribution';

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
    Distribution,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  private keyStore = inject(KeyStore);
  private crypto = inject(Crypto);
  private ws = inject(BinanceWsService);
  private destroyRef = inject(DestroyRef);
  displayedColumns = ['asset', 'available', 'inOrder', 'price', 'value'];

  rows = signal<AssetRow[]>([]);
  totalValue = signal(0);

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

    const account$ = this.keyStore.keys$.pipe(
      filter((keys) => keys.length > 0),
      switchMap((keys) => this.crypto.getAccount(keys[0].id)),
    );

    const prices$ = this.crypto.getAllPrices().pipe(
      switchMap((snapshot) => {
        const priceMap = new Map(snapshot.map((p) => [p.symbol, Number(p.price)]));
        return this.ws.subscribeToAllTickers().pipe(
          map((tickers) => {
            for (const t of tickers) priceMap.set(t.s, Number(t.c));
            return priceMap;
          }),
          startWith(priceMap),
        );
      }),
    );

    combineLatest([account$, prices$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([account, priceMap]) => {
        const rows = (account.balances as Balance[])
          .filter((b) => Number(b.free) > 0 || Number(b.locked) > 0)
          .map((b) => {
            const available = Number(b.free);
            const inOrder = Number(b.locked);
            const price = STABLES.has(b.asset) ? 1 : (priceMap.get(b.asset + 'USDT') ?? 0);
            return {
              asset: b.asset,
              available,
              inOrder,
              price,
              value: (available + inOrder) * price,
            };
          })
          .sort((a, b) => b.value - a.value);

        this.rows.set(rows);
        this.totalValue.set(rows.reduce((sum, r) => sum + r.value, 0));
      });
  }
}

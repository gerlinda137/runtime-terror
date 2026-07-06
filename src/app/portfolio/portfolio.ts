import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { KeyStore } from '../core/store/key';
import { Crypto } from '../core/services/crypto/crypto';
import { filter, forkJoin, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Typography } from '../shared/directive/typography/typography';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

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

@Component({
  selector: 'app-portfolio',
  imports: [Typography, CurrencyPipe, DecimalPipe, MatTableModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  private keyStore = inject(KeyStore);
  private crypto = inject(Crypto);
  private destroyRef = inject(DestroyRef);
  displayedColumns = ['asset', 'available', 'inOrder', 'price', 'value'];

  rows = signal<AssetRow[]>([]);
  totalValue = signal(0);

  ngOnInit() {
    this.keyStore.loadKeys();

    this.keyStore.keys$
      .pipe(
        filter((keys) => keys.length > 0),
        switchMap((keys) =>
          forkJoin({
            account: this.crypto.getAccount(keys[0].id),
            prices: this.crypto.getAllPrices(),
          }),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ account, prices }) => {
        const priceMap = new Map(prices.map((p) => [p.symbol, Number(p.price)]));

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

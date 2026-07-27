import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, EMPTY, filter, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Token } from '../../auth/service/token';
import { KeyStore } from '../../core/store/key';
import { Crypto } from '../../core/services/crypto/crypto';
import { MarketDataService } from '../../core/services/market-data/marketDataService';
import { Typography } from '../../shared/directive/typography/typography';
import { Loader } from '../../shared/ui/loader/loader';
import { FULL_ROUTES } from '../../shared/constants';

interface Balance {
  asset: string;
  free: string;
  locked: string;
}

export interface PortfolioAssetRow {
  asset: string;
  quantity: number;
  value: number;
}

const STABLES = new Set(['USDT', 'USDC', 'TUSD', 'FDUSD', 'USDP', 'USDE', 'USD1', 'AEUR', 'EURI']);
const TOP_N = 5;

@Component({
  selector: 'app-portfolio-summary',
  imports: [
    Typography,
    Loader,
    CurrencyPipe,
    DecimalPipe,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './portfolio-summary.html',
  styleUrl: './portfolio-summary.scss',
})
export class PortfolioSummary implements OnInit {
  private readonly token = inject(Token);
  private readonly keyStore = inject(KeyStore);
  private readonly crypto = inject(Crypto);
  private readonly marketData = inject(MarketDataService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isLoggedIn = computed(() => !!this.token.token());
  protected readonly portfolioLink = `/${FULL_ROUTES.ACCOUNT_PORTFOLIO}`;
  protected readonly loginLink = `/${FULL_ROUTES.AUTH_LOGIN}`;

  protected readonly displayedColumns = ['asset', 'quantity', 'value'];

  protected accountBalances = signal<Balance[]>([]);
  protected loading = signal(true);
  protected error = signal<string | null>(null);
  protected hasNoKey = signal(false);

  protected rows = computed<PortfolioAssetRow[]>(() => {
    const balances = this.accountBalances();
    const livePrices = this.marketData.rowsBySymbol();
    
    if (balances.length === 0) return [];

    const allRows = balances.map((b) => {
      const quantity = Number(b.free) + Number(b.locked);
      let price = 0;
      if (STABLES.has(b.asset)) {
        price = 1;
      } else {
        const assetData = livePrices.get(b.asset + 'USDT');
        if (assetData) {
          price = assetData.price;
        }
      }
      return { asset: b.asset, quantity, value: quantity * price };
    }).sort((a, b) => b.value - a.value);

    return allRows.slice(0, TOP_N);
  });

  protected totalValue = computed(() => {
    const balances = this.accountBalances();
    const livePrices = this.marketData.rowsBySymbol();
    
    let sum = 0;
    for (const b of balances) {
      const quantity = Number(b.free) + Number(b.locked);
      let price = 0;
      if (STABLES.has(b.asset)) {
        price = 1;
      } else {
        const assetData = livePrices.get(b.asset + 'USDT');
        if (assetData) {
          price = assetData.price;
        }
      }
      sum += quantity * price;
    }
    return sum;
  });

  ngOnInit(): void {
    if (!this.isLoggedIn()) return;

    this.keyStore.loadKeys();

    combineLatest([this.keyStore.keys$, this.keyStore.loading$])
      .pipe(
        filter(([, isLoading]) => !isLoading),
        take(1),
        switchMap(([keys]) => {
          if (keys.length === 0) {
            this.loading.set(false);
            this.hasNoKey.set(true);
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

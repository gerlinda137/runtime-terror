import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';

import { Typography } from '../../shared/directive';

import { CRYPTO_TOKENS } from '../shared/tokens.mock';

import { ChangeColor, CryptoIcon } from '../shared/directive';
import { ChangeHourPipe, SymbolPipe } from '../shared/pipes';

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
  ],
  templateUrl: './trending-market.component.html',
  styleUrl: './trending-market.component.scss',
})
export class TrendingMarketComponent {
  tokens = CRYPTO_TOKENS;
  displayedColumns = ['name', 'symbol', 'lastPrice', 'change24hour'];
}

import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';

import { CRYPTO_TOKENS } from '../../shared/constants';
import { Typography } from '../../shared/directives';

import { ChangeColor } from '../shared/change-color.directive';
import { CryptoIcon } from '../shared/crypto-icon.directive';
import { ChangeHourPipe } from '../shared/change-hour.pipe';
import { SymbolPipe } from '../shared/symbol.pipe';

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

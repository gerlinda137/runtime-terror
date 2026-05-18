import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CRYPTO_TOKENS } from '../../constants';
import { Typography } from '../typography/typography';
import { SymbolPipe } from '../../pipes/symbol-pipe';
import { CurrencyPipe } from '@angular/common';
import { ChangeHourPipe } from '../../pipes/change-hour-pipe';
import { ChangeColor } from '../../directives/change-color';
import { CryptoIcon } from '../../directives/crypto-icon';

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
  templateUrl: './trending-market.html',
  styleUrl: './trending-market.scss',
})
export class TrendingMarket {
  tokens = CRYPTO_TOKENS;
  displayedColumns = ['name', 'symbol', 'lastPrice', 'change24hour'];
}

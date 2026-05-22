import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';

import { CRYPTO_TOKENS } from '../../constants';
import { ChangeColor,CryptoIcon, Typography } from '../../directives';
import { SymbolPipe, ChangeHourPipe } from '../../pipes';

// import { ChangeColor } from '../../directives';
// import { Typography } from '../../directives/typography/typography';
// import { CryptoIcon } from '../../directives';

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

import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CRYPTO_TOKENS } from '../../constants';
import { Typography } from '../typography/typography';
import { SymbolPipe } from '../../pipes/symbol-pipe';

@Component({
  selector: 'app-trending-market',
  imports: [MatTableModule, Typography, SymbolPipe],
  templateUrl: './trending-market.html',
  styleUrl: './trending-market.scss',
})
export class TrendingMarket {
  tokens = CRYPTO_TOKENS;
  displayedColumns = ['name', 'symbol', 'lastPrice', 'change24hour'];
}

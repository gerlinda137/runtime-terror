import { Component, effect, input, output, signal } from '@angular/core';
import { MarketRow, SortColumn, SortDir } from './market-row.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

import { ChangeColor, CryptoIcon } from '../../dashboard/shared/directive';
import { ChangeHourPipe } from '../../dashboard/shared/pipes';
import { FormatVolumePipe } from './format-volume-pipe';

@Component({
  selector: 'app-markets-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    NgClass,
    ChangeColor,
    CryptoIcon,
    ChangeHourPipe,
    FormatVolumePipe,
  ],
  templateUrl: './markets-table.html',
  styleUrl: './markets-table.scss',
})
export class MarketsTable {
  rows = input<MarketRow[]>([]);
  sortChange = output<{ column: SortColumn; dir: SortDir }>();
  rowClick = output<string>();
  favToggle = output<string>();

  displayedCols = ['pair', 'price', 'change24h', 'volume24h', 'favourite'];

  private flashingSymbolsSignal = signal<Set<string>>(new Set());
  flashingSymbols = this.flashingSymbolsSignal.asReadonly();
  private prevPrices = new Map<string, number>();

  constructor() {
    effect(() => {
      this.detectPriceFlash(this.rows() ?? []);
    });
  }

  trackBySymbol(index: number, row: MarketRow): string {
    return row.symbol;
  }

  private detectPriceFlash(rows: MarketRow[]): void {
    const toAdd: string[] = [];

    rows.forEach((row) => {
      const prev = this.prevPrices.get(row.symbol);
      if (prev !== undefined && prev !== row.price) {
        toAdd.push(row.symbol);
      }
      this.prevPrices.set(row.symbol, row.price);
    });

    if (toAdd.length === 0) return;

    this.flashingSymbolsSignal.update((set) => {
      const next = new Set(set);
      toAdd.forEach((symbol) => next.add(symbol));
      return next;
    });

    toAdd.forEach((symbol) => {
      setTimeout(() => {
        this.flashingSymbolsSignal.update((set) => {
          const next = new Set(set);
          next.delete(symbol);
          return next;
        });
      }, 600);
    });
  }

  onSort(sort: Sort): void {
    const dir: SortDir = sort.direction === '' ? null : (sort.direction as SortDir);
    this.sortChange.emit({ column: sort.active as SortColumn, dir });
  }

  onFavClick(event: Event, symbol: string): void {
    event.stopPropagation();
    this.favToggle.emit(symbol);
  }

  onRowClick(symbol: string): void {
    this.rowClick.emit(symbol);
  }
}

import { Component, effect, input, output, signal } from '@angular/core';
import { MarketRow, SortColumn, SortDir } from './market-row.model';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-markets-table',
  imports: [],
  templateUrl: './markets-table.html',
  styleUrl: './markets-table.scss',
})
export class MarketsTable {
  rows = input<MarketRow[]>();
  sortChange = output<{ column: SortColumn, dir: SortDir }>();
  rowClick = output<string>();
  favToggle = output<string>();

  displayedCols = ['pair', 'price', 'change24h', 'volume24h', 'favourite'];

  private flashingSymbolsSignal = signal<Set<string>>(new Set());
  flashingSymbols = this.flashingSymbolsSignal.asReadonly();
  private prevPrices = new Map<string, number>();

  constructor() {
    effect(() => {
      this.detectPriceFlash(this.rows() ?? []);
    })
  }

  private detectPriceFlash(rows: MarketRow[]): void {
    rows.forEach(row => {
      const prev = this.prevPrices.get(row.symbol);

      if (prev !== undefined && prev !== row.price) {
        this.flashingSymbolsSignal.update(set => {
          const next = new Set(set);
          next.add(row.symbol);
          return next;
        });

        setTimeout(() => {
          this.flashingSymbolsSignal.update(set => {
            const next = new Set(set);
            next.delete(row.symbol);
            return next;
          });
        }, 600);
      }

      this.prevPrices.set(row.symbol, row.price);
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

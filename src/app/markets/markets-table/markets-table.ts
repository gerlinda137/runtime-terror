import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MarketRow, SortColumn, SortDir } from './market-row.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { FormatVolumePipe } from '../../shared/pipes/market-display/format-volume-pipe';
import { ChangeColor } from '../../shared/directive/market-display/change-color';
import { CryptoIcon } from '../../shared/directive/market-display/crypto-icon';
import { ChangeHourPipe } from '../../shared/pipes/market-display/change-hour.pipe';
import { createPriceFlash } from '../../shared/price-flash/price-flash.util';

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
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MarketsTable {
  rows = input<MarketRow[]>([]);
  sortChange = output<{ column: SortColumn; dir: SortDir }>();
  rowClick = output<string>();
  favToggle = output<string>();

  displayedCols = ['pair', 'price', 'change24h', 'volume24h', 'favourite'];

  //price flashing
  private readonly priceFlash = createPriceFlash<MarketRow>();
  flashingSymbols = this.priceFlash.flashingSymbols;

  constructor() {
    effect(() => {
      this.priceFlash.detect(this.rows() ?? []);
    });
  }

  trackBySymbol(index: number, row: MarketRow): string {
    return row.symbol;
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

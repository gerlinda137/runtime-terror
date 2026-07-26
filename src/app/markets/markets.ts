import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { WatchlistStore } from '../core/store/watchlist-store/watchlist.store';
import { SearchStore } from '../core/store/search.store';
import { MarketDataService } from '../core/services/market-data/marketDataService';
import { MarketRow, SortColumn, SortDir } from './markets-table/market-row.model';
import { MarketsTable } from './markets-table/markets-table';
import { Loader } from '../shared/ui/loader/loader';
import { filterByTab, filterBySearch, sortRows } from './markets-row.utils';

type QuoteFilter = 'ALL' | 'USDT' | 'BTC' | 'ETH';

const PAGE_SIZE = 50;

@Component({
  selector: 'app-markets',
  imports: [MatButtonToggleModule, MarketsTable, Loader],
  templateUrl: './markets.html',
  styleUrl: './markets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Markets {
  private readonly watchlistStore = inject(WatchlistStore);
  private readonly router = inject(Router);
  private readonly searchStore = inject(SearchStore);
  private readonly marketData = inject(MarketDataService);

  protected readonly isLoading = this.marketData.isLoading;
  protected readonly tabs: readonly QuoteFilter[] = ['ALL', 'USDT', 'BTC', 'ETH'];

  protected readonly activeTab = signal<QuoteFilter>('ALL');
  protected readonly sortColumn = signal<SortColumn | null>(null);
  protected readonly sortDir = signal<SortDir>(null);
  private readonly pageSize = signal(PAGE_SIZE);

  private readonly allRows = computed<MarketRow[]>(() =>
    this.marketData.rows().map((asset) => ({
      symbol: asset.symbol,
      baseAsset: asset.baseAsset,
      quoteAsset: asset.quoteAsset,
      price: asset.price,
      priceDisplay: asset.priceDisplay,
      change24h: asset.change24h,
      volume24h: asset.volume,
      isFavourite: asset.isFavourite,
    })),
  );

  protected readonly fullRows = computed<MarketRow[]>(() => {
    let rows = this.allRows();
    rows = filterByTab(rows, this.activeTab());
    rows = filterBySearch(rows, this.searchStore.query());
    rows = sortRows(rows, this.sortColumn(), this.sortDir());
    return rows;
  });

  protected readonly displayedRows = computed<MarketRow[]>(() =>
    this.fullRows().slice(0, this.pageSize()),
  );

  protected onTabChange(tab: QuoteFilter): void {
    this.activeTab.set(tab);
    this.pageSize.set(PAGE_SIZE);
  }

  protected onSortChange(event: { column: SortColumn; dir: SortDir }): void {
    this.sortColumn.set(event.dir ? event.column : null);
    this.sortDir.set(event.dir);
  }

  protected onFavToggle(symbol: string): void {
    this.watchlistStore.toggle(symbol);
  }

  protected onRowClick(symbol: string): void {
    this.router.navigate(['/trade', symbol]);
  }

  protected onLoadMore(): void {
    this.pageSize.update((size) => size + PAGE_SIZE);
  }
}
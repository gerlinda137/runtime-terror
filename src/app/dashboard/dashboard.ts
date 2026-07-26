import { Component } from '@angular/core';
import { TrendingMarket } from './trending-market/trending-market';
import { WatchlistPanel } from './watchlist-panel/watchlist-panel';

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarket, WatchlistPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}

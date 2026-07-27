import { Component } from '@angular/core';
import { TrendingMarket } from './trending-market/trending-market';
import { WatchlistPanel } from './watchlist-panel/watchlist-panel';
import { PortfolioSummary } from './portfolio-summary/portfolio-summary';

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarket, WatchlistPanel, PortfolioSummary],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}

import { Component } from '@angular/core';
import { TrendingMarket } from './trending-market/trending-market';

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarket],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}

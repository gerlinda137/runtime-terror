import { Component } from '@angular/core';
import { TrendingMarketComponent } from './trending-market/trending-market.component';

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarketComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

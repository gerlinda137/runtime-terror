import { Component } from '@angular/core';
import { TrendingMarket } from '../shared/components/trending-market/trending-market';

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarket],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

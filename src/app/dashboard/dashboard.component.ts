import { Component } from '@angular/core';
import { TrendingMarketComponent } from './trending-market/trending-market.component';
import { ChartComponent } from "../shared/ui/chart-section/chart";

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarketComponent, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

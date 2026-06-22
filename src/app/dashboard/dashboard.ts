import { Component } from '@angular/core';
import { TrendingMarket } from './trending-market/trending-market';
import { Chart } from "../shared/ui/chart-section/chart";

@Component({
  selector: 'app-dashboard',
  imports: [TrendingMarket, Chart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}

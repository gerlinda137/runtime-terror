import { Component, inject, signal, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { PublicApiService } from '../../../core/services/publickApiService/publickApiService';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [MatCardModule, MatSelectModule],
  templateUrl: './chart.html',
  styleUrls: ['./chart.scss']
})
export class ChartComponent {
  private api = inject(PublicApiService);

  symbol = signal('BTCUSDT');
  interval = signal('1h');

  prices: number[] = [];

  constructor() {
    effect(() => {
      this.loadData();
    });
  }

  loadData() {
    this.api.getKLines(this.symbol(), this.interval())
      .subscribe(data => {
        this.prices = data.map(c => Number(c[4]));

        console.log(this.prices);
      });
  }

}

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
        this.drawChart();
      });
  }

  drawChart() {
    const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.prices.length === 0) return;

    const max = Math.max(...this.prices);
    const min = Math.min(...this.prices);

    const padding = 20;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.beginPath();
    ctx.strokeStyle = '#3f51b5';
    ctx.lineWidth = 2;

    this.prices.forEach((price, i) => {
      const x = padding + (i / (this.prices.length - 1)) * width;
      const y = padding + height - ((price - min) / (max - min)) * height;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }
}

import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Typography } from '../../shared/directive/typography/typography';

export interface DistItem {
  asset: string;
  value: number;
  percent: number;
}

@Component({
  selector: 'app-distribution',
  imports: [Typography, DecimalPipe, MatProgressBarModule],
  templateUrl: './distribution.html',
  styleUrl: './distribution.scss',
})
export class Distribution {
  items = input.required<DistItem[]>();
}

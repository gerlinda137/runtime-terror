import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import type { TypographyVariantsType, TypographyClassType } from '../../../models';

@Component({
  selector: 'app-typography',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
})
export class Typography {
  @Input() variant: TypographyVariantsType = 'bodyText';
  @Input() text = '';
  @Input() className: TypographyClassType | '' = '';
  @Input() isReduce: true | undefined;
}

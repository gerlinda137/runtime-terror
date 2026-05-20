import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import type { TypographyVariantsType, TypographyClassType } from '../../../models';
import { MAIN_FONT_VARIANT } from '../../constants';

@Component({
  selector: 'app-typography',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
})
export class Typography {
  tag = input<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'>('p');
  variant = input<TypographyVariantsType>('medium-text-semibold');
  text = input<string>('');
  className = input<TypographyClassType | ''>('');
  isReduce = input<true | undefined>(undefined);

  componentClasses = computed(() => {
    const v = this.variant();
    const cls = this.className();

    return `${v} ${MAIN_FONT_VARIANT.includes(v as (typeof MAIN_FONT_VARIANT)[number]) ? 'secondary-font' : ''} ${cls ? cls : ''}`.trim();
  });
}

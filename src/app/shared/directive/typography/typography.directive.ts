import { Directive, ElementRef, inject, signal } from '@angular/core';

import type { TypographyVariantsType } from './typography.model';

@Directive({
  selector: '[appTypography]',
  standalone: true,
})
export class Typography {
  private el = inject(ElementRef<HTMLElement>);
  private variant = signal<TypographyVariantsType>('large-text-regular');

  constructor() {
    this.el.nativeElement.classList.add(this.variant());
  }
}

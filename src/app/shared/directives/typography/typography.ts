import { Directive, ElementRef, effect, signal } from '@angular/core';

import { TYPOGRAPHY_CLASSES } from '../../constants';
import type { TypographyVariantsType } from '../../../models';

@Directive({
  selector: '[appTypography]',
  standalone: true,
})
export class Typography {
  private el = inject(ElementRef<HTMLElement>);
  private variant = signal<TypographyVariantsType>('large-text-regular');

  constructor() {
    effect(() => {
      const v = this.variant();

      this.el.nativeElement.classList.remove(
        ...Array.from(this.el.nativeElement.classList)
          .filter(cl => TYPOGRAPHY_CLASSES.includes(cl as TypographyVariantsType))
      );

      this.el.nativeElement.classList.add(v);
    });
  }
}

import { AfterViewInit, Directive, ElementRef, inject, input } from '@angular/core';
import { TypographyVariantsType } from './model';

/** example:
 *  * <span appTypography="medium-text-semibold">hello world</span>
 * Hello world
 * <span appTypography="medium-text-semibold" [isLowercase]="true">Hello World</span>
 * hello World
 */
@Directive({
  selector: '[appTypography]',
  standalone: true,
})
export class Typography implements AfterViewInit {
  variant = input<TypographyVariantsType | ''>('large-text-regular', { alias: 'appTypography' });
  isLowercase = input<boolean>(false);

  private el = inject(ElementRef<HTMLElement>);
  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const finalClass = this.variant()?.trim()
      ? this.variant()
      : 'large-text-regular';
    const regCase = `first-letter-${this.isLowercase() ? 'lowercase' : 'uppercase'}`;

    element.classList.add(finalClass, regCase);
  }
}

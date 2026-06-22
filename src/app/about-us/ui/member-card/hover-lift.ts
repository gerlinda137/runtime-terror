import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverLift]',
})
export class HoverLift {
  @HostListener('mouseenter') onMouseEnter() {
    this.isLifted = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.isLifted = false;
  }

  @HostBinding('class.lifted') isLifted = false;
}

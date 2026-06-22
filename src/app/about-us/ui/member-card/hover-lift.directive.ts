import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[HoverLift]',
})
export class HoverLiftDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isLifted = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.isLifted = false;
  }

  @HostBinding('class.lifted') isLifted: boolean = false;
}

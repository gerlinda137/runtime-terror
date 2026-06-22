import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[ClickExpand]',
})
export class ClickExpandDirective {
  @HostBinding('class.expanded') isExpanded: boolean = false;

  @HostListener('click') onClick() {
    this.isExpanded = !this.isExpanded;
  }
}

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickExpand]',
})
export class ClickExpand {
  @HostBinding('class.expanded') isExpanded = false;

  @HostListener('click') onClick() {
    this.isExpanded = !this.isExpanded;
  }
}

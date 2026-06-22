import { Directive, ElementRef, HostListener, output, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutside {
  clickOutside = output<void>();

  private el = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null) {
    const element = target as HTMLElement | null;

    if (element && !this.el.nativeElement.contains(element)) {
      this.clickOutside.emit();
    }
  }
}

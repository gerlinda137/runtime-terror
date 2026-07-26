import { Directive, ElementRef, HostListener, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCryptoIcon]',
})
export class CryptoIcon implements OnInit {
  symbol = input.required<string>({ alias: 'appCryptoIcon' });
  private el = inject(ElementRef);

  private readonly fallbackSrc = '/assets/crypto-icons/generic.svg';

  ngOnInit() {
    const ticker = this.symbol().toLowerCase();
    this.el.nativeElement.src = `/assets/crypto-icons/${ticker}.svg`;
  }

  @HostListener('error')
  onError(): void {
    this.el.nativeElement.src = this.fallbackSrc;
  }
}

import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appCryptoIcon]',
})
export class CryptoIcon {
  symbol = input.required<string>({ alias: 'appCryptoIcon' });
  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const ticker = this.symbol().replace('USDT', '').toLowerCase();
      this.el.nativeElement.src = `assets/crypto-icons/${ticker}.svg`;
    });
  }
}

import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCryptoIcon]',
})
export class CryptoIcon implements OnInit {
  symbol = input.required<string>({ alias: 'appCryptoIcon' });
  private el = inject(ElementRef);

  ngOnInit() {
    const ticker = this.symbol().toLowerCase();
    this.el.nativeElement.src = `/assets/crypto-icons/${ticker}.svg`;
  }
}

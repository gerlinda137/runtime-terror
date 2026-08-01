import { Directive, effect, ElementRef, HostListener, inject, input } from '@angular/core';
import { CRYPTO_ICON_SYMBOLS } from './crypto-icon-manifest';

@Directive({
  selector: '[appCryptoIcon]',
})
export class CryptoIcon {
  symbol = input.required<string>({ alias: 'appCryptoIcon' });
  private el = inject(ElementRef);
  private readonly fallbackSrc = '/assets/crypto-icons/generic.svg';

  private readonly aliases :Record<string,string> = {
    iota: 'miota'
  }

  constructor(){
    effect(()=>{
      const raw = this.symbol().toLowerCase();
      const icon = this.aliases[raw] ?? raw;

      this.el.nativeElement.src = CRYPTO_ICON_SYMBOLS.has(icon)
      ? `/assets/crypto-icons/${icon}.svg` : this.fallbackSrc;
    })
  }

  @HostListener('error')
  onError(): void {
    this.el.nativeElement.src = this.fallbackSrc;
  }
}

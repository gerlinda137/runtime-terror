import { Component, inject } from '@angular/core';
import { KeyStore } from '../core/store/key';
import { Crypto } from '../core/services/crypto/crypto';
import { filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  private keyStore = inject(KeyStore);
  private crypto = inject(Crypto);

  constructor() {
    this.keyStore.loadKeys();
    this.keyStore.keys$
      .pipe(
        filter((keys) => keys.length > 0),
        switchMap((keys) => this.crypto.getAccount(keys[0].id)),
        takeUntilDestroyed(),
      )
      .subscribe((account) => {
        console.log('account', account);
      });
  }
}

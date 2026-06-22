import { Injectable, signal } from '@angular/core';
import { ACCESS_TOKEN } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class Token {
  private readonly _token = signal<string | null>(localStorage.getItem(ACCESS_TOKEN));
  readonly token = this._token.asReadonly();

  setToken(token: string): void {
    this._token.set(token);
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  removeToken(): void {
    this._token.set(null);
    localStorage.removeItem(ACCESS_TOKEN);
  }
}

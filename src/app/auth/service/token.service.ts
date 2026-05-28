import { computed, Injectable, signal } from '@angular/core';
import { ACCESS_TOKEN } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly _token = signal<string | null>(localStorage.getItem(ACCESS_TOKEN));
  readonly token = computed(() => this._token());

  setToken(token: string): void {
    this._token.set(token);
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  getToken(): string | null {
    return this._token();
  }

  removeToken(): void {
    this._token.set(null);
    localStorage.removeItem(ACCESS_TOKEN);
  }

  isAuthenticated(): boolean {
    return Boolean(this._token());
  }
}

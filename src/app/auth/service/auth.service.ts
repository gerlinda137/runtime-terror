import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environments';

import { AuthResponse, User, UserPayload } from '../../core/models';
import { FOOL_ROUTES, USER } from '../../shared/constants';
import { TokenService } from './token.service';

// ToDo: add custom error catcher
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private readonly _user = signal<User | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _base_Url = environment.apiUrl;

  readonly user = computed(() => this._user());
  readonly token = this.tokenService.token;//tokenService's token is already computed()
  readonly isLoading = computed(() => this._isLoading());

  readonly isAuthenticated = computed(() => Boolean(this.tokenService.token()));

  constructor() {
    this.restoreFromStorage();
  }

  login(payload: UserPayload) {
    this._isLoading.set(true);
    return this.http
      .post<AuthResponse>(`${this._base_Url}/${FOOL_ROUTES.AUTH_LOGIN}`, payload)
      .pipe(
        tap((res) => {
          this.setSession(res);
          this._isLoading.set(false);
        }),
        catchError((err) => {
          this._isLoading.set(false);
          return throwError(() => err);
        }),
      );
  }

  register(payload: UserPayload) {
    this._isLoading.set(true);
    return this.http
      .post<AuthResponse>(`${this._base_Url}/${FOOL_ROUTES.AUTH_REGISTER}`, payload)
      .pipe(
        tap((res) => {
          this.setSession(res);
          this._isLoading.set(false);
        }),
        catchError((err) => {
          this._isLoading.set(false);
          return throwError(() => err);
        }),
      );
  }

  logout() {
    this._user.set(null);
    this.tokenService.removeToken();
    localStorage.removeItem(USER);
  }

  private setSession(res: AuthResponse) {
    this.tokenService.setToken(res.accessToken);
    this._user.set(res.user);
    localStorage.setItem(USER, JSON.stringify(res.user));
  }

  private restoreFromStorage() {
    const userRaw = localStorage.getItem(USER);
    if (this.isAuthenticated() && userRaw) {
      this._user.set(JSON.parse(userRaw));
    }
  }
}

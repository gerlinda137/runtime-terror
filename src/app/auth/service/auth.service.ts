import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environments';

import { AuthResponse, User, UserPayload } from '../../core/models';
import { ACCESS_TOKEN, FOOL_ROUTES, USER } from '../../shared/constants';

// ToDo: add custom error catcher
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _base_Url = environment.apiUrl;

  readonly user = computed(() => this._user());
  readonly token = computed(() => this._token());
  readonly isAuthenticated = computed(() => Boolean(this._token()));
  readonly isLoading = computed(() => this._isLoading());

  constructor() {
    this.restoreFromStorage();
  }

  login(payload: UserPayload) {
    this._isLoading.set(true);
    return this.http.post<AuthResponse>(`${this._base_Url}/${FOOL_ROUTES.AUTH_LOGIN}`, payload)
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
    return this.http.post<AuthResponse>(`${this._base_Url}/${FOOL_ROUTES.AUTH_REGISTER}`, payload)
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
    this._token.set(null);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
  }

  private setSession(res: AuthResponse) {
    this._token.set(res.accessToken);
    this._user.set(res.user);
    localStorage.setItem(ACCESS_TOKEN, res.accessToken);
    localStorage.setItem(USER, JSON.stringify(res.user));
  }

  private restoreFromStorage() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const userRaw = localStorage.getItem(USER);
    if (token && userRaw) {
      this._token.set(token);
      this._user.set(JSON.parse(userRaw));
    }
  }
}

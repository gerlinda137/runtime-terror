import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environments';
import { AuthResponse, User, UserPayload } from '../../core/models';
import { FULL_ROUTES, USER } from '../../shared/constants';
import { Token } from '../../auth/service/token';
import { UserStore } from './user.store';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private http = inject(HttpClient);
  private tokenService = inject(Token);
  private userStore = inject(UserStore);

  private baseUrl = environment.apiUrl;

  private state$ = new BehaviorSubject<AuthState>({
    user: null,
    loading: false,
    error: null,
  });

  readonly user$ = this.state$.pipe(map(s => s.user));
  readonly loading$ = this.state$.pipe(map(s => s.loading));
  readonly error$ = this.state$.pipe(map(s => s.error));

  constructor() {
    this.restoreFromStorage();
  }

  login(payload: UserPayload) {
    this.patch({ loading: true, error: null });

    return this.http.post<AuthResponse>(`${this.baseUrl}/${FULL_ROUTES.AUTH_LOGIN}`, payload).pipe(
      tap(res => {
        this.setSession(res);
        this.patch({ loading: false });
      }),
      catchError(err => {
        this.patch({ loading: false, error: err?.error?.message ?? 'Login failed' });
        return of(null);
      })
    );
  }

  register(payload: UserPayload) {
    this.patch({ loading: true, error: null });

    return this.http.post<AuthResponse>(`${this.baseUrl}/${FULL_ROUTES.AUTH_REGISTER}`, payload).pipe(
      tap(res => {
        this.setSession(res);
        this.patch({ loading: false });
      }),
      catchError(err => {
        this.patch({ loading: false, error: err?.error?.message ?? 'Registration failed' });
        return of(null);
      })
    );
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem(USER);
    this.patch({ user: null });
  }

  private setSession(res: AuthResponse) {
    this.tokenService.setToken(res.accessToken);
    this.patch({ user: res.user });
    this.userStore.setUser(res.user);
    localStorage.setItem(USER, JSON.stringify(res.user));
  }

  private restoreFromStorage() {
    const raw = localStorage.getItem(USER);
    if (this.tokenService.token() && raw) {
      const user = JSON.parse(raw);

      this.patch({ user });          // AuthStore
      this.userStore.setUser(user);  // UserStore
    }
  }

  private patch(partial: Partial<AuthState>) {
    this.state$.next({
      ...this.state$.value,
      ...partial,
    });
  }
}

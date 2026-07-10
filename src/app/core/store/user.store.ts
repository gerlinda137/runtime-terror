import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { environment } from '../../../environments/environments';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private userPoint = `${this.baseUrl}/user`;

  private state$ = new BehaviorSubject<UserState>({
    user: null,
    loading: false,
    error: null,
  });

  readonly user$ = this.state$.pipe(map(s => s.user));
  readonly loading$ = this.state$.pipe(map(s => s.loading));
  readonly error$ = this.state$.pipe(map(s => s.error));

  setUser(user: User | null) {
    this.patch({ user });
  }

  loadUser() {
    this.patch({ loading: true, error: null });

    this.http.get<User>(this.userPoint)
      .pipe(
        tap(user => {
          this.patch({ user, loading: false });
        }),
        catchError(() => {
          this.patch({ loading: false, error: 'Failed to load user' });
          return of(null);
        })
      ).subscribe();
  }

  updateUser(data: Partial<User>) {
    this.patch({ loading: true });

    this.http.put<User>(this.userPoint, data).pipe(
      tap(user => {
        this.patch({ user, loading: false });
      }),
      catchError(() => {
        this.patch({ loading: false, error: 'Update failed' });
        return of(null);
      })
    ).subscribe();
  }

  private patch(partial: Partial<UserState>) {
    this.state$.next({ ...this.state$.value, ...partial });
  }
}

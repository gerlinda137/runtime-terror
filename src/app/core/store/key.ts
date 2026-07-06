import { inject, Injectable } from "@angular/core";
import { KeyService } from "../services/key/key";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs";
import type { CreateKeyPayload, KeyState } from "../models";

@Injectable({ providedIn: 'root' })
export class KeyStore {
  private service = inject(KeyService);

  private state$ = new BehaviorSubject<KeyState>({
    keys: [],
    loading: false,
    error: null,
  });

  readonly keys$ = this.state$.pipe(map(s => s.keys));
  readonly loading$ = this.state$.pipe(map(s => s.loading));
  readonly error$ = this.state$.pipe(map(s => s.error));

  loadKeys() {
    this.patch({ loading: true });

    this.service.getKeys().pipe(
      tap(keys => this.patch({ keys, loading: false })),
      catchError(() => {
        this.patch({ loading: false, error: 'Failed to load keys' });
        return of([]);
      })
    ).subscribe();
  }

  addKey(payload: CreateKeyPayload) {
    this.patch({ loading: true });

    this.service.addKey(payload).pipe(
      tap(newKey => {
        const keys = [...this.state$.value.keys, newKey];
        this.patch({ keys, loading: false });
      }),
      catchError(() => {
        this.patch({ loading: false, error: 'Failed to add key' });
        return of(null);
      })
    ).subscribe();
  }

  deleteKey(id: string) {
    this.patch({ loading: true });

    this.service.deleteKey(id).pipe(
      tap(() => {
        const keys = this.state$.value.keys.filter(k => k.id !== id);
        this.patch({ keys, loading: false });
      }),
      catchError(() => {
        this.patch({ loading: false, error: 'Failed to delete key' });
        return of(null);
      })
    ).subscribe();
  }

  private patch(partial: Partial<KeyState>) {
    this.state$.next({ ...this.state$.value, ...partial });
  }
}

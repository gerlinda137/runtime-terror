import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environments';
import { ROUTES } from '../../shared/constants';

export interface ContactPayload {
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  private readonly _baseUrl = environment.apiUrl;
  private readonly _isLoading = signal(false);

  readonly isLoading = this._isLoading.asReadonly();

  send(payload: ContactPayload) {
    this._isLoading.set(true);

    return this.http.post(`${this._baseUrl}/${ROUTES.CONTACT}`, payload).pipe(
      tap(() => this._isLoading.set(false)),
      catchError((err) => {
        this._isLoading.set(false);
        return throwError(() => err);
      }),
    );
  }
}

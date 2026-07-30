import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast';

export const messageInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const e = event.body as { message: string };
        const { message } = e ?? 'No message';
        if (message) {
          toast.success(message as string);
        }
      }
    }),
    catchError((err: HttpErrorResponse) => {

      const message =
        err.error?.message ||
        err.error?.error ||
        err.statusText ||
        'Opps!! Try later';

      toast.error(message);

      return throwError(() => err);
    })
  );
};

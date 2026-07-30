import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast';
import { ServerDownDialog } from '../../shared/ui/server-down-dialog/server-down-dialog';
import { MatDialog } from '@angular/material/dialog';

export const messageInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const dialog = inject(MatDialog);

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
      console.log('interceptor');
      console.log(err);

      if (err.status === 0 || err.status === 503 || err.error instanceof ProgressEvent) {

        dialog.open(ServerDownDialog, {
          width: '400px'
        });

        return throwError(() => err);
      }

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

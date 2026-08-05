import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerDownDialog } from '../../shared/ui';
import { catchError, throwError } from 'rxjs';
import { ServerDownDialogApiError } from '../../shared/ui/server-down-dialog-api-error/server-down-dialog-api-error';

export const healthInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isServerDown =
        err.status === 0 ||
        err.error instanceof ProgressEvent;

      if (isServerDown) {
        dialog.open(ServerDownDialog, {
          width: '400px',
        });

        return throwError(() => ({
          status: 503,
          message: 'Сервер недоступен',
        }));
      }

      if (err.status === 503) {
        dialog.open(ServerDownDialogApiError, {
          width: '400px',
        });

        return throwError(() => ({
          status: 503,
          message: 'Binance недоступен',
        }));
      }

      return throwError(() => err);
    })
  );
};

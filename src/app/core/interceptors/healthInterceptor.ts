import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerDownDialog } from '../../shared/ui';
import { catchError, throwError } from 'rxjs';

export const healthInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isServerDown =
        err.status === 0 ||
        err.status === 503 ||
        err.error instanceof ProgressEvent;

      if (isServerDown) {
        dialog.open(ServerDownDialog, {
          width: '400px',
        });
      }

      return throwError(() => err);
    })
  );
};

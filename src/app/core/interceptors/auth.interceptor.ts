import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../auth/service/token.service';
import { AuthService } from '../../auth/service/auth.service';
import { catchError, throwError } from 'rxjs';

// Attaches JWT token to all outgoing HTTP requests and handles 401 unauthorized errors
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const token = tokenService.getToken();

  // Do not attach token to login/register requests because user is not authenticated yet
  // TODO: review
  const isAuthRequest = req.url.includes('/login') || req.url.includes('/register');

  const clonedReq = token && !isAuthRequest ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
      }

      return throwError(() => err);
    }),
  );
};

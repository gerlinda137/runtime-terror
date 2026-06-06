import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../auth/service/token.service';
import { AuthService } from '../../auth/service/auth.service';
import { catchError, throwError } from 'rxjs';
import { FULL_ROUTES } from '../../shared/constants';
import { Router } from '@angular/router';

// Attaches JWT token to all outgoing HTTP requests and handles 401 unauthorized errors
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = tokenService.token();

  // Do not attach token to login/register requests because user is not authenticated yet
  const isAuthRequest =
    req.url.includes(FULL_ROUTES.AUTH_LOGIN) || req.url.includes(FULL_ROUTES.AUTH_REGISTER);

  const clonedReq =
    token && !isAuthRequest ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthRequest) {
        const currentUrl = router.url;

        const loginRoute = [FULL_ROUTES.AUTH_LOGIN];
        const loginExtras = { queryParams: { returnUrl: currentUrl } };

        authService.logout();

        router
          .navigate(loginRoute, loginExtras)
          //for safaty added catch() if navigation fails
          .catch(() => {
            router.navigate(loginRoute,loginExtras);
          });
      }

      return throwError(() => err);
    }),
  );
};

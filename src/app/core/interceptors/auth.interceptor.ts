import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../../auth/service/token';
import { AuthStore } from '../../core/store/auth.store';
import { catchError, throwError } from 'rxjs';
import { FULL_ROUTES } from '../../shared/constants';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { Location } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);
  const auth = inject(AuthStore);
  const router = inject(Router);
  const location = inject(Location);

  const token = tokenService.token();

  // Requests that should NOT include token
  const isAuthRequest =
    req.url.includes(FULL_ROUTES.AUTH_LOGIN) ||
    req.url.includes(FULL_ROUTES.AUTH_REGISTER);

  // Only attach token to our backend
  const isOwnBackend = req.url.startsWith(environment.apiUrl);

  const clonedReq =
    token && !isAuthRequest && isOwnBackend
      ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
      : req;

  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthRequest && isOwnBackend) {
        const browserUrl = location.path(true) || '/';
        const currentUrl = router.url === '/' ? browserUrl : router.url;

        const loginRoute = [FULL_ROUTES.AUTH_LOGIN];
        const loginExtras = { queryParams: { returnUrl: currentUrl } };

        // Logout via AuthStore
        auth.logout();

        router.navigate(loginRoute, loginExtras).catch(() => {
          router.navigate(loginRoute, loginExtras);
        });
      }

      return throwError(() => err);
    })
  );
};

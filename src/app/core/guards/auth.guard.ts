import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { FULL_ROUTES } from '../../shared/constants';
import { Token } from '../../auth/service/token';

export const authGuard: CanActivateFn = (state): boolean | UrlTree => {
  const router = inject(Router);
  const tokenService = inject(Token);

  if (tokenService.token()) {
    return true;
  }

  return router.createUrlTree([FULL_ROUTES.AUTH_LOGIN], {
    queryParams: {
      returnUrl: state.url
    }
  });
};

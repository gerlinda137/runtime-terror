import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { FULL_ROUTES } from '../../shared/constants';
import { TokenService } from '../../auth/service/token.service';

export const authGuard: CanActivateFn = (state,route): boolean | UrlTree => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.token()) {
    return true;
  }

  return router.createUrlTree([FULL_ROUTES.AUTH_LOGIN], {
    queryParams: {
      returnUrl: state.url
    }
  });
};

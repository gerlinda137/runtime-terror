import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FOOL_ROUTES } from '../../shared/constants';
import { AuthService } from '../../auth/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.isAuthenticated()){
    return true;
  }

  return router.createUrlTree([FOOL_ROUTES.AUTH_LOGIN]);
};

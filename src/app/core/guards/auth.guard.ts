import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../auth/service/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if(tokenService.isAuthenticated()){
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};

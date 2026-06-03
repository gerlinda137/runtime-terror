import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { FOOL_ROUTES } from '../../shared/constants';
import { AuthService } from '../../auth/service/auth.service';

export const authGuard: CanActivateFn = (state):boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.isAuthenticated()){
    return true;
  }

  return router.createUrlTree([FOOL_ROUTES.AUTH_LOGIN],{
    queryParams:{
      returnUrl:state.url
    }
  });
};

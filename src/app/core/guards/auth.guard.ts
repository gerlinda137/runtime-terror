import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { FOOL_ROUTES } from '../../shared/constants';
import { TokenService } from '../../auth/service/token.service';

export const authGuard: CanActivateFn = (state):boolean | UrlTree => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if(tokenService.token()){
    return true;
  }

  return router.createUrlTree([FOOL_ROUTES.AUTH_LOGIN],{
    queryParams:{
      returnUrl:state.url
    }
  });
};

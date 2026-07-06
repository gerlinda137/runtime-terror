import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, filter, map, take } from 'rxjs';

import { Token } from '../../auth/service/token';
import { KeyStore } from '../store/key';

export const portfolioGuard: CanActivateFn = () => {
  const token = inject(Token);
  const keyStore = inject(KeyStore);
  const router = inject(Router);

  const dashboard = router.createUrlTree(['/']);

  if (!token.token()) {
    return dashboard;
  }

  keyStore.loadKeys();

  return combineLatest([keyStore.keys$, keyStore.loading$]).pipe(
    filter(([, loading]) => !loading),
    take(1),
    map(([keys]) => (keys.length > 0 ? true : dashboard)),
  );
};

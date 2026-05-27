import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ROUTES } from './shared/constants';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.HOME, pathMatch: 'full' },
  { path: ROUTES.HOME, component: DashboardComponent },
  {
    path: ROUTES.AUTH,
    children: [
      {
        path: ROUTES.LOGIN,
        loadComponent: () =>
          import('../app/auth/login/login-page.component')
            .then(m => m.LoginPageComponent),
      },
      {
        path: ROUTES.REGISTER,
        loadComponent: () =>
          import('../app/auth/register/register-page.component')
            .then(m => m.RegisterPageComponent),
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ROUTES } from './shared/constants';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
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
  {
    path: ROUTES.ACCOUNT,
    canActivate:[authGuard],
    children: [
      {
        path: ROUTES.SETTINGS,
        loadComponent: () =>
          import('../app/settings/pages/settings-page/settings-page')
            .then(m => m.SettingsPage),
      },
      {
        path: ROUTES.API_KEYS,
        loadComponent: () =>
          import('../app/settings/pages/api-keys-page/api-keys-page')
            .then(m => m.ApiKeysPage),
      }
    ]
  }
];

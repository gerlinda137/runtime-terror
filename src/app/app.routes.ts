import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ROUTES } from './shared/constants';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', loadComponent: () => import('../app/about-us/about-us.component').then(m => m.AboutUsComponent) },
  {
    path: ROUTES.AUTH,
    children: [
      {
        path: ROUTES.LOGIN,
        loadComponent: () =>
          import('../app/auth/login/login-page.component').then((m) => m.LoginPageComponent),
      },
      {
        path: ROUTES.REGISTER,
        loadComponent: () =>
          import('../app/auth/register/register-page.component').then(
            (m) => m.RegisterPageComponent,
          ),
      },
    ],
  },
  {
    path: ROUTES.ACCOUNT,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: ROUTES.SETTINGS,
        loadComponent: () =>
          import('../app/account/pages/settings-page/settings-page').then((m) => m.SettingsPage),
      },
      {
        path: ROUTES.API_KEYS,
        loadComponent: () =>
          import('../app/account/pages/api-keys-page/api-keys-page').then((m) => m.ApiKeysPage),
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

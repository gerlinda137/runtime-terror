import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

import { ROUTES } from './shared/constants';
import { authGuard } from './core/guards/auth.guard';
import { portfolioGuard } from './core/guards/portfolio.guard';

export const routes: Routes = [
  { path: '', component: Dashboard, pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about-us',
    loadComponent: () => import('../app/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'markets',
    loadComponent: () => import('../app/markets/markets').then((m) => m.Markets),
  },
  {
    path: ROUTES.AUTH,
    children: [
      {
        path: ROUTES.LOGIN,
        loadComponent: () => import('../app/auth/login/login-page').then((m) => m.LoginPage),
      },
      {
        path: ROUTES.REGISTER,
        loadComponent: () =>
          import('../app/auth/register/register-page').then((m) => m.RegisterPage),
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
      {
        path: ROUTES.PORTFOLIO,
        canActivate: [portfolioGuard],
        loadComponent: () => import('./portfolio/portfolio').then((m) => m.Portfolio),
      },
    ],
  },
  {
    path: ROUTES.CONTACT,
    loadComponent: () =>
      import('./contact-us/contact-us-page/contact-us-page').then((m) => m.ContactUsPage),
  },

  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found').then((c) => c.NotFound),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

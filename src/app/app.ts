import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Header, Sidebar } from './layout';
import { Logo } from './shared/ui';
import { THEMES } from './shared/constants';
import type { ThemeType } from './core/models';

import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthStore } from './core/store/auth.store';
import { ServerHealthService } from './core/services/serverHealth/serverHealthService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Logo, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.no-sidebar]': 'isNotFound()',
  },
})
export class App {
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private auth = inject(AuthStore);
  private serverHealth = inject(ServerHealthService);

  title = signal('crypto-trade');

  // AuthStore signals
  isLoggedIn = this.auth.isAuthenticatedSig;

  // Theme
  theme = signal<ThemeType>(THEMES.DARK);

  // Detect "not-found" page
  isNotFound = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects === '/not-found')
    ),
    { initialValue: false }
  );

  constructor() {
    this.applyTheme(this.theme());
    this.serverHealth.initApp();
  }

  applyTheme(theme: ThemeType) {
    const root = this.document.documentElement;

    if (theme === THEMES.DARK) {
      root.setAttribute('data-theme', THEMES.DARK);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  toggleTheme = () => {
    const next = this.theme() === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.theme.set(next);
    this.applyTheme(next);
  };
}

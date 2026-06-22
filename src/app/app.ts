import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Header, Sidebar } from './layout';
import { Logo } from './shared/ui';
import { MOCK_USER, THEMES } from './shared/constants';
import type { User, ThemeType } from './core/models';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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

  protected readonly title = signal('crypto-trade');
  isLoggedIn = true;
  user: User = MOCK_USER;
  theme = signal<ThemeType>(THEMES.LIGHT);

  isNotFound = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects === '/not-found'),
    ),
    { initialValue: false },
  );

  constructor() {
    this.themeApply(this.theme());
  }

  themeApply(theme: ThemeType) {
    if (theme === THEMES.DARK) {
      this.document.documentElement.setAttribute('data-theme', THEMES.DARK);
    } else {
      this.document.documentElement.removeAttribute('data-theme');
    }
  }

  toggleTheme = () => {
    const theme = this.theme() === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.theme.set(theme);
    this.themeApply(theme);
  };
}

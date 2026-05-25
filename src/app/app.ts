import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Logo } from './shared/components';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MOCK_USER, THEMES } from './shared/constants';
import type { User, ThemeType } from './shared/models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, Logo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private document = inject(DOCUMENT);

  protected readonly title = signal('crypto-trade');
  isLoggedIn = true;
  user: User = MOCK_USER;
  theme = signal<ThemeType>(THEMES.LIGHT);

  toggleTheme = () => {
    const theme = this.theme() === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.theme.set(theme);

    if (theme === THEMES.DARK) {
      this.document.documentElement.setAttribute('data-theme', THEMES.DARK);
    } else {
      this.document.documentElement.removeAttribute('data-theme');
    }
  };
}

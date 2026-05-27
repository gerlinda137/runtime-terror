import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { Logo } from './shared/ui/logo/logo.component';
import { MOCK_USER, THEMES } from './shared/constants';
import type { User, ThemeType } from './core/models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, Logo],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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

import { Component, DOCUMENT, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Logo, HeaderComponent, SidebarComponent } from './shared/components';
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
  protected readonly theme: WritableSignal<ThemeType> = signal(THEMES.LIGHT);

  protected readonly title = signal('crypto-trade');
  isLoggedIn = true;
  user: User = MOCK_USER;


  protected toggleTheme(theme: ThemeType) {
    this.theme.set(theme);

    if (theme === THEMES.DARK) {
      this.document.documentElement.setAttribute('data-theme', THEMES.DARK);
    } else {
      this.document.documentElement.removeAttribute('data-theme');
    }
  }
}

import { Component, ElementRef, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/components/sidebar-component/sidebar-component";
import { HeaderComponent } from "./shared/components/header-component/header-component";
import { Logo } from './shared/components/logo/logo';
import { IUser, ThemeType } from './models';
import { MOCK_USER, THEMES } from './shared/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, Logo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private host = inject(ElementRef);
  protected readonly theme: WritableSignal<ThemeType> = signal(THEMES.LIGHT);

  protected readonly title = signal('crypto-trade');
  isLoggedIn = true;
  user: IUser = MOCK_USER;


  protected toggleTheme(theme: ThemeType) {
    this.theme.set(theme);

    if (theme === THEMES.DARK) {
      this.host.nativeElement.setAttribute('data-theme', THEMES.DARK);
    } else {
      this.host.nativeElement.removeAttribute('data-theme');
    }
  }
}

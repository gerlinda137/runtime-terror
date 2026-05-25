import { Component, input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import type { User, ThemeType } from '../../shared/models';
import { Typography } from '../../shared/directives';


@Component({
  selector: 'app-header',
  imports: [Typography, MatBadgeModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = input<boolean>(false);
  user = input<User | null>(null);
  theme = input<ThemeType>();
  toggleTheme = input<() => void>();
  welcomeText = '';
  userLogo = '';

  ngOnInit() {
    const { logo, name } = this.user() ?? { logo: 'assets/icons/default_user.svg', name: '' };
    this.welcomeText = `Welcome ${name}!`;
    this.userLogo = logo;
  }

  handleTheme() {
    const handler = this.toggleTheme();

    if (handler) {
      handler();
    }
  }

  handleMode() {
    return this.theme() === 'light' ? 'dark_mode' : 'light_mode';
  }
}

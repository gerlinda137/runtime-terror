import { Component, input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import type { User, ThemeType } from '../../../models';
import { Typography } from "../../directives";


@Component({
  selector: 'app-header-component',
  imports: [Typography, MatBadgeModule, MatMenuModule, MatIconModule, Typography],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = input<boolean>(false);
  user = input<User | null>(null);
  theme = input<ThemeType>();
  toggleTheme = input<(theme: ThemeType) => void>();
  welcomeText = '';
  userLogo = '';


  ngOnInit() {
    const { logo, name } = this.user() ?? { logo: 'assets/icons/default_user.svg', name: '' };
    this.welcomeText = `Welcome ${name}!`;
    this.userLogo = logo;
  }
}

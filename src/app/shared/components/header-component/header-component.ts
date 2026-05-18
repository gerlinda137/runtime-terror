import { Component, Input, OnInit } from '@angular/core';
import { Typography } from "../typography/typography";
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { IUser, ThemeType } from '../../../models';


@Component({
  selector: 'app-header-component',
  imports: [Typography, MatBadgeModule, MatMenuModule, MatIconModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Input() user: IUser | null = null;
  @Input() theme!: ThemeType;
  @Input() toggleTheme!: (theme: ThemeType) => void;
  welcomeText = '';
  userLogo = 'assets/icons/default_user.svg';


  ngOnInit() {
    if (!this.user) return;
    this.welcomeText = `Welcome ${this.user.name ?? ''}!`;
    this.userLogo = this.user.logo;
  }
}

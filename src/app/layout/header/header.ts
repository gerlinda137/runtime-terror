import { Component, input, inject, DestroyRef } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import type { ThemeType, User } from '../../core/models';
import { Typography } from '../../shared/directive';
import { Logo } from '../../shared/ui';
import { UserStore } from '../../core/store/user.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [Typography, MatBadgeModule, MatMenuModule, MatIconModule, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private userStore = inject(UserStore);
  private destroyRef = inject(DestroyRef);

  user: User | null = null;
  loading = false;
  error: string | null = null;

  isLoggedIn = input<boolean>(false);
  theme = input<ThemeType>();
  toggleTheme = input<() => void>();

  welcomeText = '';
  userLogo = '';

  constructor() {
    this.userStore.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(u => {
        this.user = u;
        this.updateUserInfo();
      });

    this.userStore.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(l => this.loading = l);

    this.userStore.error$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.error = e);

    this.userStore.loadUser();
  }

  private updateUserInfo() {
    const name = this.user?.name ?? '';
    this.welcomeText = `Welcome ${name}!`;
    this.userLogo = 'assets/icons/default_user.svg';
  }

  handleTheme() {
    const handler = this.toggleTheme();
    if (handler) handler();
  }

  handleMode() {
    return this.theme() === 'light' ? 'dark_mode' : 'light_mode';
  }
}

import { Component, input, inject, DestroyRef, computed, OnInit, signal } from '@angular/core';
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
export class Header implements OnInit {
  private userStore = inject(UserStore);
  private destroyRef = inject(DestroyRef);

  user: User | null = null;
  loading = false;
  error: string | null = null;

  isLoggedIn = input<boolean>(false);
  theme = input<ThemeType>();
  toggleTheme = input<() => void>();

  private userSig = signal<User | null>(null);
  welcomeText = computed(() => {
    const u = this.userSig();
    const name = u?.name ?? '';
    return `Welcome ${name}!`;
  });

  userLogo = computed(() => {
    return 'assets/icons/default_user.svg';
  });

  constructor() {
    this.userStore.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(u => {
        this.userSig.set(u);
      });

    this.userStore.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  ngOnInit() {
    this.userStore.loadUser();
  }

  handleTheme() {
    const handler = this.toggleTheme();
    if (handler) handler();
  }

  handleMode() {
    return this.theme() === 'light' ? 'dark_mode' : 'light_mode';
  }
}

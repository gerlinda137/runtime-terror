import { Component, input, inject, DestroyRef, computed, OnInit, signal, effect } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';

import type { ThemeType, User } from '../../core/models';
import { Typography } from '../../shared/directive';
import { Logo } from '../../shared/ui';
import { UserStore } from '../../core/store/user.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStore } from '../../core/store/auth.store';
import { FULL_ROUTES } from '../../shared/constants';
import { merge } from 'rxjs';
import { environment } from '../../../environments/environments';
import { SearchStore } from '../../core/store/search.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [Typography, FormsModule,MatBadgeModule, MatMenuModule, MatIconModule, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private authStore = inject(AuthStore);
  private userStore = inject(UserStore);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  searchStore = inject(SearchStore);

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
  avatarUrl = signal<string | null>(null);
  userLogo = computed(() => {
    const url = this.avatarUrl();
    return url ?? 'assets/icons/default_user.svg';
  });

  constructor() {
    merge(this.authStore.user$, this.userStore.user$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((u) => {
        this.userSig.set(u);
      });

    effect(() => {
      const user = this.userSig();
      if (!user) {
        this.avatarUrl.set(null);
        return;
      }

      const url = user.avatarUrl
        ? `${environment.apiUrl}/${user.avatarUrl}?v=${Date.now()}`
        : null;

      this.avatarUrl.set(url);
    });

    this.userStore.loading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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

  logout() {
    this.authStore.logout();
    this.router.navigateByUrl(`/${FULL_ROUTES.AUTH_LOGIN}`);
  }

  goToLogin() {
    this.router.navigateByUrl(`/${FULL_ROUTES.AUTH_LOGIN}`);
  }

  goToRegister() {
    this.router.navigateByUrl(`/${FULL_ROUTES.AUTH_REGISTER}`);
  }

  onSearch(query:string){
    this.searchStore.setQuery(query);
  }
}

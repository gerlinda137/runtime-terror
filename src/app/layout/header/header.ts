import {
  Component,
  input,
  inject,
  computed
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';

import type { ThemeType } from '../../core/models';
import { Typography } from '../../shared/directive';
import { Logo } from '../../shared/ui';
import { toSignal } from '@angular/core/rxjs-interop';
import { FULL_ROUTES } from '../../shared/constants';
import { filter, map } from 'rxjs';
import { SearchStore } from '../../core/store/search.store';
import { FormsModule } from '@angular/forms';
import { ROUTES } from '../../shared/constants/routes.constant';
import { AuthStore } from '../../core/store/auth.store';
import { UserStore } from '../../core/store/user.store';

@Component({
  selector: 'app-header',
  imports: [
    Typography,
    FormsModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    Logo,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthStore);
  private router = inject(Router);
  private userStore = inject(UserStore);
  searchStore = inject(SearchStore);

  theme = input<ThemeType>();
  toggleTheme = input<() => void>();

  // auth signals
  authUser = this.auth.userSig;
  isLogin = this.auth.isAuthenticatedSig;

  // user profile signals
  profileUser = this.userStore.userSig;
  profileAvatar = this.userStore.avatarSig;

  // unified user
  userCombined = computed(() => {
    return this.profileUser() ?? this.authUser();
  });

  welcomeText = computed(() => {
    const name = this.userCombined()?.name ?? '';
    return name ? `Welcome ${name}!` : 'Welcome!';
  });

  userLogo = computed(() =>
    this.profileAvatar() ?? 'assets/icons/default_user.svg'
  );
  // --- Page detection ---
  isMarketsPage = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.url.startsWith(`/${ROUTES.MARKETS}`))
    ),
    { initialValue: this.router.url.startsWith(`/${ROUTES.MARKETS}`) }
  );

  loginPath = FULL_ROUTES.AUTH_LOGIN;
  registerPAth = FULL_ROUTES.AUTH_REGISTER;

  // --- Actions ---
  handleTheme() {
    this.toggleTheme()?.();
  }

  handleMode = computed(() =>
    this.theme() === 'light' ? 'dark_mode' : 'light_mode'
  );

  logout() {
    this.auth.logout();
    this.userStore.setUser(null);
    this.router.navigateByUrl(`/${FULL_ROUTES.AUTH_LOGIN}`);
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  onSearch(query: string) {
    this.searchStore.setQuery(query);
  }
}

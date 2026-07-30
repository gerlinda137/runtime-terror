import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

import { SIDEBAR_ITEMS } from '../constant';
import type { SidebarItem } from '../model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Typography } from '../../../shared/directive';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLinkActive,
    RouterLink,
    Typography,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private auth = inject(AuthStore);

  isLogin = this.auth.isAuthenticatedSig;
  userSig = this.auth.userSig;

  menu = computed<SidebarItem[]>(() =>
    SIDEBAR_ITEMS.filter(item => item.isPublic || this.isLogin())
  );

  openedItem = signal<string | null>(null);

  toggle(label: string) {
    this.openedItem.set(
      this.openedItem() === label ? null : label
    );
  }
}

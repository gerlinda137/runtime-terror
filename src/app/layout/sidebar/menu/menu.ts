import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CommonModule } from '@angular/common';

import { SIDEBAR_ITEMS } from '../constant';
import type { SidebarItem } from '../model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Typography } from '../../../shared/directive';
import { UserStore } from '../../../core/store/user.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStore } from '../../../core/store/auth.store';
import { User } from '../../../core/models';
import { merge } from 'rxjs';

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
    Typography
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {

  menu = computed<SidebarItem[]>(() =>
    SIDEBAR_ITEMS.filter(item => item.isPublic || this.isLogin())
  );

  private authStore = inject(AuthStore);
  private userStore = inject(UserStore);
  private destroyRef = inject(DestroyRef);

  private userSig = signal<User | null>(null);
  isLogin = signal<boolean>(false);

  constructor() {
    merge(this.authStore.user$, this.userStore.user$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((u) => {
        this.userSig.set(u);
        this.isLogin.set(true);
      });

    effect(() => {
      const user = this.userSig();
      if (!user) {
        this.isLogin.set(false);
        return;
      }
    });

    this.userStore.loading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  ngOnInit() {
    this.userStore.loadUser();
  }

  openedItem = signal<string | null>(null);

  toggle(label: string) {
    this.openedItem.set(
      this.openedItem() === label ? null : label
    );
  }
}

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CommonModule } from '@angular/common';

import { SIDEBAR_ITEMS } from '../constant';
import type { SidebarItem } from '../model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Typography } from '../../../shared/directive';

@Component({
  selector: 'app-menu',
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
  standalone: true,
})
export class Menu {

  menu: SidebarItem[] = SIDEBAR_ITEMS;
  openedItem: string | null = null;

  toggle(label: string) {
    this.openedItem = this.openedItem === label ? null : label;
  }
}

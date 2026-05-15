import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SIDEBAR_ITEMS } from '../../constants';
import type { ISidebarItem } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Typography } from "../typography/typography";

@Component({
  selector: 'app-sidebar-component',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    Typography
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
  standalone: true,
})
export class SidebarComponent {
  menu: ISidebarItem[] = SIDEBAR_ITEMS;
  isMobile = false;
  openedItem: string | null = null;

  toggle(label: string) {
    this.openedItem = this.openedItem === label ? null : label;
  }
}

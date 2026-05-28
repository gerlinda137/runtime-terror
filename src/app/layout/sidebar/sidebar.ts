import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';

import { Typography } from '../../shared/directive';

import { SIDEBAR_ITEMS } from './constant';
import type { SidebarItem } from './model';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    Typography
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
})
export class Sidebar implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  private bp = inject(BreakpointObserver);

  menu: SidebarItem[] = SIDEBAR_ITEMS;
  isMobile = false;
  openedItem: string | null = null;


  ngOnInit() {
    this.bp.observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.isMobile = result.matches;

        if (!this.sidenav) return;
        if (this.isMobile) {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
      });
  }

  toggleBurger() {
    if (!this.isMobile) { return }
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();

    }
  }

  toggle(label: string) {
    this.openedItem = this.openedItem === label ? null : label;
  }
}

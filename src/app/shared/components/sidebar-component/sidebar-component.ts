import { Component, effect, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SIDEBAR_ITEMS } from '../../constants';
import type { ISidebarItem } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Typography } from "../typography/typography";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  @ViewChild('sidenav') sidenav!: MatSidenav;

  menu: ISidebarItem[] = SIDEBAR_ITEMS;
  isMobile = false;
  openedItem: string | null = null;

  constructor(private bp: BreakpointObserver) { }

  ngOnInit() {
    this.bp.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;

        if (this.isMobile) {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
      });
  }

  closeBurger() {
    if (!this.isMobile) { return }
    this.sidenav.close();
  }

  toggle(label: string) {
    this.openedItem = this.openedItem === label ? null : label;
  }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SIDEBAR_ITEMS } from '../../constants';
import type { SidebarItem } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterLink, ɵEmptyOutletComponent } from "@angular/router";
import { Typography } from '../../directives/typography/typography';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    Typography,
    ɵEmptyOutletComponent
],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
  standalone: true,
})
export class SidebarComponent implements OnInit {
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

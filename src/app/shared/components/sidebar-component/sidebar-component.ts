import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SIDEBAR_ITEMS } from '../../constants';
import type { ISidebarItem } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
  standalone: true,
})
export class SidebarComponent {
  menu: ISidebarItem[] = SIDEBAR_ITEMS;
  isMobile = false;
}

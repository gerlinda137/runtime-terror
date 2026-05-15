import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { SIDEBAR_ITEMS } from '../../constants';
import { SidebarItemType } from '../../../models';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent {
  menu: SidebarItemType[] = SIDEBAR_ITEMS;
  isMobile = false;
}

import { Component, HostListener, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CommonModule } from '@angular/common';

import { Menu } from './menu/menu';
import { ClickOutside } from '../../shared/directive';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    Menu,
    ClickOutside
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
})
export class Sidebar {
  isOpen = signal(false);

  @HostListener('window:resize')
  onResize() {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }
  }

  openMenu() {
    this.isOpen.set(true);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}

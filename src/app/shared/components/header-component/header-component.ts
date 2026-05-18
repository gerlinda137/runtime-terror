import { Component } from '@angular/core';
import { Typography } from "../typography/typography";
import {MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header-component',
  imports: [Typography,MatBadgeModule,MatMenuModule,MatIconModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  isLogedin = true;
}

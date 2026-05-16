import { Component } from '@angular/core';
import { Typography } from "../typography/typography";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-component',
  imports: [Typography,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {}

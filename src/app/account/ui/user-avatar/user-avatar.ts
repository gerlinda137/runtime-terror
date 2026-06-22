import { Component, input } from '@angular/core';
import { User } from '../../../core/models';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  imports: [UpperCasePipe],
  standalone: true,
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  userData = input<User | null>();
}

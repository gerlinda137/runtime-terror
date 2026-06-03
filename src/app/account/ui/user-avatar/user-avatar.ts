import { Component, input } from '@angular/core';
import { User } from '../../../core/models';

@Component({
  selector: 'app-user-avatar',
  imports: [],
  standalone: true,
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatarComponent {
  userData = input<User | null>(null);
}

import { Component, signal } from '@angular/core';
import { User } from '../../../core/models';
import { UserAvatar } from '../../ui';
import { NameEditor } from '../../ui/name-editor/name-editor';
import { PasswordEditor } from '../../ui/password-editor/password-editor';

@Component({
  selector: 'app-settings-page',
  imports: [
    UserAvatar,
    NameEditor,
    PasswordEditor,
  ],
  standalone: true,
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  user = signal<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  });
}

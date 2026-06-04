import { Component, signal } from '@angular/core';
import { User } from '../../../core/models';
import { UserAvatarComponent } from '../../ui';
import { NameEditorComponent } from '../../ui/name-editor/name-editor';
import { PasswordEditorComponent } from '../../ui/password-editor/password-editor';

@Component({
  selector: 'app-settings-page',
  imports: [
    UserAvatarComponent,
    NameEditorComponent,
    PasswordEditorComponent,
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

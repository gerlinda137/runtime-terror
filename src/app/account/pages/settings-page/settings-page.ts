import { Component, inject } from '@angular/core';
import { UserAvatar } from '../../ui';
import { NameEditor } from '../../ui/name-editor/name-editor';
import { PasswordEditor } from '../../ui/password-editor/password-editor';
import { UserStore } from '../../../core/store/user.store';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private userStore = inject(UserStore);

  user = toSignal(this.userStore.user$, { initialValue: null });

  constructor() {
    console.log(this.user());
  }
}

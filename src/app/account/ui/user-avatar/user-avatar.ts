import { Component, effect, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { User } from '../../../core/models';
import { UpperCasePipe } from '@angular/common';
import { UserStore } from '../../../core/store/user.store';
import { environment } from '../../../../environments/environments';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-user-avatar',
  imports: [UpperCasePipe, MatIcon],
  standalone: true,
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  private userStore = inject(UserStore);
  private baseUrl = environment.apiUrl;
  userData = input<User | null>(null);
  avatar = signal<string | null>(null);
  name = signal<string | null>(null);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const user = this.userData();
      if (!user) return;

      const url = user.avatarUrl
        ? `${this.baseUrl}/${user.avatarUrl}?v=${Date.now()}`
        : null;

      this.avatar.set(url);
      this.name.set(user.name);
    });
  }

  onAvatarClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (this.avatar()) {
        this.userStore.updateAvatar(file);
      } else {
        this.userStore.uploadAvatar(file);
      }
    }
  }

  onDeleteAvatar(event: Event) {
    event.stopPropagation();
    this.userStore.deleteAvatar();
  }
}

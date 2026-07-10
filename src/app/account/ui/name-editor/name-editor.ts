import { Component, effect, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ClickOutside, Typography } from '../../../shared/directive';
import { UserStore } from '../../../core/store/user.store';

@Component({
  selector: 'app-name-editor',
  imports: [
    ReactiveFormsModule,
    Typography,
    ClickOutside,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
  ],
  templateUrl: './name-editor.html',
  styleUrl: './name-editor.scss',
})
export class NameEditor {
  editing = signal(false);

  name = input<string>();
  control = new FormControl('');

  private userStore = inject(UserStore);

  constructor() {
    effect(() => {
      const n = this.name();
      if (this.editing() && n) {
        this.control.setValue(n);
      }
    });
  }

  startEdit() {
    this.editing.set(true);
  }

  save() {
    const value = this.control.value?.trim();
    if (value) {
      this.userStore.updateUser({ name: value });
    }
    this.cancel();
  }

  cancel() {
    this.editing.set(false);
  }
}

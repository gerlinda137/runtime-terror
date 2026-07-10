import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Typography, ClickOutside } from "../../../shared/directive";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { UserStore } from '../../../core/store/user.store';


@Component({
  selector: 'app-password-editor',
  imports: [
    ReactiveFormsModule,
    Typography,
    MatTooltip,
    MatIcon,
    ClickOutside
  ],
  templateUrl: './password-editor.html',
  styleUrl: './password-editor.scss',
})
export class PasswordEditor {
  private destroyRef = inject(DestroyRef);
  private userStore = inject(UserStore);

  editing = signal(false);

  form = new FormGroup({
    oldPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    newPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.cancel());
  }

  startEdit() {
    this.editing.set(true);
  }

  save() {
    if (this.form.invalid) return;

    const data = {
      oldPassword: this.form.value.oldPassword!,
      newPassword: this.form.value.newPassword!,
    };

    this.userStore.updatePassword(data);

    this.cancel();
  }

  cancel() {
    this.editing.set(false);
    this.form.reset();
  }
}

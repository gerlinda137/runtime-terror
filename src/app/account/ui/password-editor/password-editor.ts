import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Typography, ClickOutside } from "../../../shared/directive";
import { UpdatePassword } from '../../../core/models';
import { EDIT_PASS, CHANGE_PASS, NEW_PASS, CURRENT_PASS, SAVE_PASS } from '../../../shared/constants';
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";


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

  editing = signal(false);
  passwordData = output<UpdatePassword | null>();
  changePass = CHANGE_PASS;
  newPass = NEW_PASS;
  currentPass = CURRENT_PASS;
  editPass = EDIT_PASS;
  savePass = SAVE_PASS;

  form = new FormGroup({
    oldPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    newPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });


  constructor() {
    this.destroyRef.onDestroy(() => {
      this.cancel();
    });
  }

  startEdit() {
    this.editing.set(true);
  }

  async save() {
    // if (this.form.invalid) return;
    //toDo request to server
    // catching error
    this.cancel();
  }

  cancel() {
    if (!this.editing()) return;
    this.editing.set(false);
    this.form.reset();
  }
}

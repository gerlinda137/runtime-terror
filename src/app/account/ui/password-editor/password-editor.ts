import { Component, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Typography } from "../../../shared/directive";
import { UpdatePassword } from '../../../core/models';
import { EDIT_PASS, CHANGE_PASS, NEW_PASS, OLD_PASS, SAVE_PASS } from '../../../shared/constants';
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-password-editor',
  imports: [
    ReactiveFormsModule,
    Typography,
    MatTooltip,
    MatIcon],
  templateUrl: './password-editor.html',
  styleUrl: './password-editor.scss',
})
export class PasswordEditorComponent {
  isEditMode = signal(false);
  passwordData = output<UpdatePassword | null>();
  changePass = CHANGE_PASS;
  newPass = NEW_PASS;
  oldPass = OLD_PASS;
  editPass = EDIT_PASS;
  savePass = SAVE_PASS;

  form = new FormGroup({
    oldPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    newPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  startEdit() {
    this.isEditMode.set(true);
  }

  async save() {
    // if (this.form.invalid) return;
    //toDo request to server
    // catching error
    this.cancel();
  }

  cancel() {
    if (!this.isEditMode()) return;
    this.isEditMode.set(false);
    this.form.reset();
  }
}

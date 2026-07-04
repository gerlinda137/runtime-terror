import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Typography } from "../../../shared/directive";
import { KeyStore } from "../../../core/store/key";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-key-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    Typography
  ],
  templateUrl: './add-key-dialog.html',
  styleUrl: './add-key-dialog.scss',
})
export class AddKeyDialog {
  private store = inject(KeyStore);
  private dialogRef = inject(MatDialogRef<AddKeyDialog>);

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apiKey: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    secret: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    exchange: new FormControl('BINANCE_SPOT_TESTNET', { nonNullable: true }),
  });

  save() {
    if (this.form.invalid) return;

    this.store.addKey(this.form.getRawValue());
    this.dialogRef.close();
  }
}

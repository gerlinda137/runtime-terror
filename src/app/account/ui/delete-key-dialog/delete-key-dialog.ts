import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Typography } from '../../../shared/directive';
import { KeyStore } from '../../../core/store/key';
import type { ApiKey } from '../../../core/models';

@Component({
  selector: 'app-delete-key-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Typography
  ],
  templateUrl: './delete-key-dialog.html',
})
export class DeleteKeyDialog {
  private store = inject(KeyStore);
  private dialogRef = inject(MatDialogRef<DeleteKeyDialog>);
  key = inject(MAT_DIALOG_DATA) as ApiKey;

  confirm() {
    this.store.deleteKey(this.key.id);
    this.dialogRef.close();
  }
}

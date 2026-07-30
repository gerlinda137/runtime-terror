import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snack = inject(MatSnackBar);

  error(message: string) {
    this.snack.open(message, 'Close', {
      duration: 4000,
      panelClass: ['error-toast'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  success(message: string) {
    this.snack.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-toast'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

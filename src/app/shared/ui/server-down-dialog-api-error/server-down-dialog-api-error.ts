import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-server-down-dialog-api-error',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>BINANCE API is not available</h2>

    <mat-dialog-content>
      <p>
        Try again later. The Binance API is currently unavailable, which may be due to maintenance or technical issues. We apologize for the inconvenience and appreciate your patience.
      </p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class ServerDownDialogApiError { }

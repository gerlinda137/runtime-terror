import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-server-down-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Server is not running</h2>

    <mat-dialog-content>
      <p>
        The backend server is not available.
        To start the server, download the repository:
      </p>

      <p>
        <a href="https://github.com/MaryAnzh/Crypto-Trade-Angular_Task-Backend" target="_blank">
          Crypto-Trade Backend Repository
        </a>
      </p>

      <p>
        Then follow the Docker instructions in the README.
      </p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class ServerDownDialog {}

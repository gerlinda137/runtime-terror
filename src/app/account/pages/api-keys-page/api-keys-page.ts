import { Component, DestroyRef, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Typography } from "../../../shared/directive";
import { KeyStore } from "../../../core/store/key";
import { ApiKey } from "../../../core/models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AddKeyDialog } from "../../ui/add-key-dialog/add-key-dialog";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from "@angular/common";
import { DeleteKeyDialog } from "../../ui/delete-key-dialog/delete-key-dialog";

@Component({
  selector: 'app-api-keys',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DatePipe,
    Typography
  ],
  templateUrl: './api-keys-page.html',
  styleUrl: './api-keys-page.scss',
})
export class ApiKeysPage {
  private store = inject(KeyStore);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  keys = signal<ApiKey[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.store.keys$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(k => this.keys.set(k));

    this.store.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(l => this.loading.set(l));

    this.store.error$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.error.set(e));

    this.store.loadKeys();
  }

  openAddDialog() {
    this.dialog.open(AddKeyDialog, { panelClass: 'custom-dialog-panel' });
  }

  openDeleteDialog(key: ApiKey) {
    this.dialog.open(DeleteKeyDialog, { data: key, panelClass: 'custom-dialog-panel' });
  }
}

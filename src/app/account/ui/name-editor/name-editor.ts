import { Component, effect, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ClickOutside, Typography } from '../../../shared/directive';

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
export class NameEditorComponent {
  editing = signal(false);
  name = model<string | null>('');
  control = new FormControl('');

  constructor() {
    effect(() => {
      if (this.editing()) {
        this.control.setValue(this.name());
      }
    });
  }

  startEdit() {
    this.editing.set(true);
  }

  save() {
    const value = this.control.value?.trim();
    if (value) {
      this.name.set(value);
    }
    this.cancel();
  }

  cancel() {
    if (!this.editing) return;
    this.editing.set(false);
  }
}

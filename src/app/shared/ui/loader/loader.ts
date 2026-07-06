import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loader">
      <mat-spinner [diameter]="diameter()" />
    </div>
  `,
  styles: `
    .loader {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--padding-l);
    }
  `,
})
export class Loader {
  diameter = input(40);
}

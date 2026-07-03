import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Typography } from '../../shared/directive';
import { ROUTES } from '../../shared/constants';
import { AuthStore } from '../../core/store/auth.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Typography,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected readonly registerLink = `/${ROUTES.AUTH}/${ROUTES.REGISTER}`;
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.authStore.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.isLoading.set(v));

    this.authStore.error$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(err => this.errorMessage.set(err));
  }

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);

    this.authStore.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        if (res) this.router.navigateByUrl('/');
      }
    });
  }
}

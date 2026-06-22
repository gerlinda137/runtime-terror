import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Typography } from '../../shared/directive';
import { ROUTES } from '../../shared/constants';
import { Auth } from '../service/auth';
import { PasswordMatch } from '../service/password-match';

@Component({
  selector: 'app-register-page',
  imports: [
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    Typography,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private passwordMatch = inject(PasswordMatch);
  private authService = inject(Auth);
  private router = inject(Router);

  protected readonly loginLink = `/${ROUTES.AUTH}/${ROUTES.LOGIN}`;
  protected readonly isLoading = this.authService.isLoading;
  protected readonly errorMessage = signal<string | null>(null);

  nameForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });
  ageForm = this.fb.group({
    age: this.fb.control<number | null>(null, [Validators.required, Validators.min(18)]),
  });
  emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  passwordForm = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatch.match },
  );

  onSubmit() {
    if (
      this.nameForm.invalid ||
      this.ageForm.invalid ||
      this.emailForm.invalid ||
      this.passwordForm.invalid
    ) {
      this.nameForm.markAllAsTouched();
      this.ageForm.markAllAsTouched();
      this.emailForm.markAllAsTouched();
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);

    const { name } = this.nameForm.getRawValue();
    const { age } = this.ageForm.getRawValue();
    const { email } = this.emailForm.getRawValue();
    const { password } = this.passwordForm.getRawValue();

    this.authService.register({ name, email, password, age: age ?? undefined }).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) =>
        this.errorMessage.set(
          err?.error?.message ?? 'Registration failed. Please try again.',
        ),
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Typography } from '../../shared/directive';
import { PasswordMatchService } from '../service/password-match.service';

@Component({
  selector: 'app-register-page',
  imports: [
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    Typography,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private passwordMatch = inject(PasswordMatchService);

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
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Typography } from '../../shared/directive';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-us-page',
  imports: [
    Typography,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
  ],
  templateUrl: './contact-us-page.html',
  styleUrl: './contact-us-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsPage {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  protected readonly submitted = signal(false);
  protected readonly isLoading = this.contactService.isLoading;
  protected readonly errorMessage = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(formDir: FormGroupDirective) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);

    this.contactService.send(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitted.set(true);
        formDir.resetForm(); // сбрасывает значения И флаг submitted — поля не подсвечиваются
      },
      error: (err) =>
        this.errorMessage.set(err?.error?.message ?? 'Failed to send. Please try again.'),
    });
  }
}

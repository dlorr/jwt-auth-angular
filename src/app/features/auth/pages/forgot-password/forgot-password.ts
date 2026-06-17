import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { ApiError } from '../../../../core/models/api.model';

import { Card } from '../../../../shared/components/ui/card/card';
import { Button } from '../../../../shared/components/ui/button/button';
import { ErrorMessage } from '../../../../shared/components/feedback/error-message/error-message';

import { emailValidator } from '../../../../shared/validators/email.validator';
import { getFormErrorMessage } from '../../../../shared/utils/form-error.util';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, ErrorMessage],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  submitted = false;
  loading = signal(false);
  serverError = signal('');
  successMessage = signal('');

  getErrorMessage = getFormErrorMessage;

  form = this.fb.nonNullable.group({
    email: ['', [emailValidator]],
  });

  onSubmit() {
    this.submitted = true;
    this.serverError.set('');
    this.successMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.forgotPassword(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.serverError.set(apiError?.message || 'Failed to send reset email.');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}

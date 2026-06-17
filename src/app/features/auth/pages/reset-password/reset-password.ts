import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { ApiError } from '../../../../core/models/api.model';

import { Card } from '../../../../shared/components/ui/card/card';
import { Button } from '../../../../shared/components/ui/button/button';
import { ErrorMessage } from '../../../../shared/components/feedback/error-message/error-message';

import { passwordValidator } from '../../../../shared/validators/password.validator';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm-password.validator';
import { getFormErrorMessage } from '../../../../shared/utils/form-error.util';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, ErrorMessage],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  submitted = false;
  loading = signal(false);
  serverError = signal('');
  successMessage = signal('');

  getErrorMessage = getFormErrorMessage;

  verificationCode = this.route.snapshot.queryParamMap.get('code') || '';

  form = this.fb.nonNullable.group(
    {
      password: ['', [passwordValidator]],
      confirmPassword: [''],
    },
    {
      validators: [confirmPasswordValidator('password', 'confirmPassword')],
    },
  );

  onSubmit() {
    this.submitted = true;
    this.serverError.set('');
    this.successMessage.set('');

    if (!this.verificationCode) {
      this.serverError.set('Invalid or missing reset code.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password } = this.form.getRawValue();

    this.loading.set(true);

    this.authService
      .resetPassword({
        password,
        verificationCode: this.verificationCode,
      })
      .subscribe({
        next: (response) => {
          this.successMessage.set(response.message);

          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1000);
        },
        error: (error: HttpErrorResponse) => {
          const apiError = error.error as ApiError;
          this.serverError.set(apiError?.message || 'Failed to reset password.');
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}

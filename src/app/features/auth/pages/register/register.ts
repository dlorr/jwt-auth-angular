import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { ApiError } from '../../../../core/models/api.model';

import { Card } from '../../../../shared/components/ui/card/card';
import { Button } from '../../../../shared/components/ui/button/button';
import { ErrorMessage } from '../../../../shared/components/feedback/error-message/error-message';

import { emailValidator } from '../../../../shared/validators/email.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm-password.validator';
import { getFormErrorMessage } from '../../../../shared/utils/form-error.util';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, ErrorMessage],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  submitted = false;
  loading = signal(false);
  serverError = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  getErrorMessage = getFormErrorMessage;

  form = this.fb.nonNullable.group(
    {
      email: ['', [emailValidator]],
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

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.register(this.form.getRawValue()).subscribe({
      next: (user) => {
        this.authState.setUser(user);
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.serverError.set(apiError?.message || 'Registration failed.');
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}

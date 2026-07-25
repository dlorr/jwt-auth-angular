import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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

import {
  getPasswordStrength,
  PasswordStrength,
} from '../../../../shared/utils/password-strength.util';

import { LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, ErrorMessage, LucideEye, LucideEyeOff],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  submitted = false;
  loading = signal(false);
  serverError = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  getErrorMessage = getFormErrorMessage;
  passwordStrength = signal<PasswordStrength>(getPasswordStrength(''));

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

  constructor() {
    this.form.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((password) => {
        this.passwordStrength.set(getPasswordStrength(password ?? ''));
      });
  }

  getInputClass(control: AbstractControl) {
    if (!control.touched) {
      return 'field-input';
    }

    if (control === this.form.controls.confirmPassword && this.form.hasError('passwordMismatch')) {
      return 'field-input field-input-error';
    }

    return control.invalid ? 'field-input field-input-error' : 'field-input field-input-success';
  }

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

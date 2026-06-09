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

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  submitted = false;
  loading = signal(false);
  serverError = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [emailValidator]],
    password: ['', [passwordValidator]],
  });

  onSubmit() {
    this.submitted = true;
    this.serverError.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            this.authState.setUser(user);
            this.router.navigateByUrl('/dashboard');
          },
          error: () => {
            this.serverError.set('Login succeeded, but failed to load user.');
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.serverError.set(apiError?.message || 'Login failed.');
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}

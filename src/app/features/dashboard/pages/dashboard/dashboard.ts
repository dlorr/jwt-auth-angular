import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { ApiError } from '../../../../core/models/api.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  user = this.authState.user;

  logoutLoading = signal(false);
  resendLoading = signal(false);

  resendMessage = signal('');
  resendError = signal('');

  logout() {
    this.logoutLoading.set(true);

    this.authService.logout().subscribe({
      next: () => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
      complete: () => {
        this.logoutLoading.set(false);
      },
    });
  }

  resendVerification() {
    this.resendLoading.set(true);
    this.resendMessage.set('');
    this.resendError.set('');

    this.authService.resendVerificationEmail().subscribe({
      next: (response) => {
        this.resendMessage.set(response.message);
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.resendError.set(apiError?.message || 'Failed to resend verification email.');
      },
      complete: () => {
        this.resendLoading.set(false);
      },
    });
  }
}

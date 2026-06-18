import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { ApiError } from '../../../../core/models/api.model';

import { Card } from '../../../../shared/components/ui/card/card';
import { ErrorMessage } from '../../../../shared/components/feedback/error-message/error-message';
import { Spinner } from '../../../../shared/components/ui/spinner/spinner';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink, Card, ErrorMessage, Spinner],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  loading = signal(true);
  successMessage = signal('');
  serverError = signal('');

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');

    if (!code) {
      this.loading.set(false);
      this.serverError.set('Invalid verification link.');
      return;
    }

    this.authService.verifyEmail(code).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.serverError.set(apiError?.message || 'Email verification failed.');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AuthService } from '../../../../core/services/auth.service';
import { Session } from '../../../../core/models/session.model';
import { ApiError } from '../../../../core/models/api.model';

@Component({
  selector: 'app-sessions',
  imports: [RouterLink, DatePipe],
  templateUrl: './sessions.html',
  styleUrl: './sessions.css',
})
export class Sessions {
  private authService = inject(AuthService);

  sessions = signal<Session[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.getSessions().subscribe({
      next: (sessions) => {
        this.sessions.set(sessions);
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.errorMessage.set(apiError?.message || 'Failed to load sessions.');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  deleteSession(id: string) {
    this.successMessage.set('');
    this.errorMessage.set('');

    this.authService.deleteSession(id).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
        this.loadSessions();
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiError;
        this.errorMessage.set(apiError?.message || 'Failed to remove session.');
      },
    });
  }
}

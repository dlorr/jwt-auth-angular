import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../core/services/auth.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  user = this.authState.user;
  loading = signal(false);

  logout() {
    this.loading.set(true);

    this.authService.logout().subscribe({
      next: () => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
      error: (_error: HttpErrorResponse) => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}

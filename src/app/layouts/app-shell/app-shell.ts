import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { AuthStateService } from '../../core/services/auth-state.service';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  user = this.authState.user;

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
    });
  }
}

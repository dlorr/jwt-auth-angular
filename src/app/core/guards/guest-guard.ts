import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (authState.isAuthenticated()) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return authService.getCurrentUser().pipe(
    map((user) => {
      authState.setUser(user);
      router.navigateByUrl('/dashboard');
      return false;
    }),
    catchError(() => {
      authState.clearUser();
      return of(true);
    }),
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (authState.isAuthenticated()) {
    return true;
  }

  return authService.getCurrentUser().pipe(
    map((user) => {
      authState.setUser(user);
      return true;
    }),
    catchError(() => {
      authState.clearUser();
      router.navigateByUrl('/login');
      return of(false);
    }),
  );
};

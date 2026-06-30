import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authState = inject(AuthStateService);
  const router = inject(Router);

  const requestWithCredentials = req.clone({
    withCredentials: true,
  });

  return next(requestWithCredentials).pipe(
    catchError((error: HttpErrorResponse) => {
      const isUnauthorized = error.status === 401;

      const isRefreshRequest = req.url.includes('/auth/refresh');
      const isLoginRequest = req.url.includes('/auth/login');
      const isRegisterRequest = req.url.includes('/auth/register');
      const isCurrentUserRequest = req.url.endsWith('/user');

      if (
        !isUnauthorized ||
        isRefreshRequest ||
        isLoginRequest ||
        isRegisterRequest ||
        isCurrentUserRequest
      ) {
        return throwError(() => error);
      }

      return authService.refresh().pipe(
        switchMap(() => next(requestWithCredentials)),
        catchError((refreshError) => {
          authState.clearUser();
          router.navigateByUrl('/login');
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

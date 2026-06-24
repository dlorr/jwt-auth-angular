import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api.constants';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../models/auth.model';

import { User } from '../models/user.model';

import { MessageResponse } from '../models/api.model';
import { SessionsResponse } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
      payload,
    );
  }

  register(payload: RegisterRequest) {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.AUTH.REGISTER}`,
      payload,
    );
  }

  logout() {
    return this.http.get<MessageResponse>(`${environment.apiUrl}${API_ENDPOINTS.AUTH.LOGOUT}`);
  }

  getCurrentUser() {
    return this.http.get<User>(`${environment.apiUrl}${API_ENDPOINTS.USER.PROFILE}`);
  }

  refresh() {
    return this.http.get<MessageResponse>(`${environment.apiUrl}${API_ENDPOINTS.AUTH.REFRESH}`);
  }

  forgotPassword(payload: ForgotPasswordRequest) {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
      payload,
    );
  }

  resetPassword(payload: ResetPasswordRequest) {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
      payload,
    );
  }

  verifyEmail(code: string) {
    return this.http.get<MessageResponse>(`${environment.apiUrl}/auth/email/verify/${code}`);
  }

  resendVerificationEmail() {
    return this.http.post<MessageResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.USER.RESEND_VERIFICATION}`,
      {},
    );
  }

  getSessions() {
    return this.http.get<SessionsResponse>(`${environment.apiUrl}${API_ENDPOINTS.SESSION.LIST}`);
  }

  deleteSession(id: string) {
    return this.http.delete<MessageResponse>(
      `${environment.apiUrl}${API_ENDPOINTS.SESSION.DELETE(id)}`,
    );
  }
}

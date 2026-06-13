import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api.constants';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth.model';

import { User } from '../models/user.model';

import { MessageResponse } from '../models/api.model';

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
}

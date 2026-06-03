import { User } from './user.model';
import { MessageResponse } from './api.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  verificationCode: string;
}

export type LoginResponse = MessageResponse;

export type RegisterResponse = User;

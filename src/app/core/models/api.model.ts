export interface MessageResponse {
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

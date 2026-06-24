export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',

    FORGOT_PASSWORD: '/auth/password/forgot',
    RESET_PASSWORD: '/auth/password/reset',
  },

  USER: {
    PROFILE: '/user',
    RESEND_VERIFICATION: '/user/resend-verification',
  },

  SESSION: {
    LIST: '/session/sessions',
    DELETE: (id: string) => `/session/${id}`,
  },
} as const;

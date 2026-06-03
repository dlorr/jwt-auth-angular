export interface Session {
  _id: string;
  userAgent?: string;
  createdAt: string;
  isCurrent?: boolean;
}

export type SessionsResponse = Session[];

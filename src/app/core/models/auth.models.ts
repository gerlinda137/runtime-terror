import { User } from "./user.model";

export interface JwtPayload {
  /** user id */
  sub: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

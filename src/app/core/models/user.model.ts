export interface UserPayload {
  email: string;
  name?: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

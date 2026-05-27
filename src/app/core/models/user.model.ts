export interface UserPayload {
  email: string;
  name?: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateKeyPayload {
  name: string;
  apiKey: string;
  secret: string;
  exchange: string;
}

export interface KeyState {
  keys: ApiKey[];
  loading: boolean;
  error: string | null;
}

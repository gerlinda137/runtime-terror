export const ROUTES = {
  HOME: 'dashboard',
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  SETTINGS: 'settings',
  API_KEYS: 'api-keys'
} as const
const { AUTH, LOGIN, REGISTER } = ROUTES;

export const FOOL_ROUTES = {
  AUTH_LOGIN: `${AUTH}/${LOGIN}`,
  AUTH_REGISTER: `${AUTH}/${REGISTER}`
}

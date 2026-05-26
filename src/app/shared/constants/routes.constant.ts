export const ROUTES = {
  HOME: 'dashboard',
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
} as const
const { AUTH, LOGIN, REGISTER } = ROUTES;

export const FOOL_ROUTES = {
  AUTH_LOGIN: `${AUTH}/${LOGIN}`,
  AUTH_REGISTER: `${AUTH}/${REGISTER}`
}

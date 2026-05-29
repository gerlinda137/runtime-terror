export const ROUTES = {
  HOME: 'dashboard',
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  SETTINGS: 'settings',
  ACCOUNT: 'account',
  API_KEYS: 'keys'
} as const
const { AUTH, LOGIN, REGISTER, ACCOUNT, SETTINGS, API_KEYS } = ROUTES;

export const FOOL_ROUTES = {
  AUTH_LOGIN: `${AUTH}/${LOGIN}`,
  AUTH_REGISTER: `${AUTH}/${REGISTER}`,
  ACCOUNT_SETTINGS: `${ACCOUNT}/${SETTINGS}`,
  ACCOUNT_KEYS: `${ACCOUNT}/${API_KEYS}`
}

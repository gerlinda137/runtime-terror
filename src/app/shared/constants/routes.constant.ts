export const ROUTES = {
  HOME: 'dashboard',
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  SETTINGS: 'settings',
  ACCOUNT: 'account',
  API_KEYS: 'keys',
  CONTACT: 'contact',
  PORTFOLIO: 'portfolio',
  MARKETS: 'markets',
  ABOUT_US: 'about-us',
} as const;
const { AUTH, LOGIN, REGISTER, ACCOUNT, SETTINGS, API_KEYS, PORTFOLIO } = ROUTES;

export const FULL_ROUTES = {
  AUTH_LOGIN: `${AUTH}/${LOGIN}`,
  AUTH_REGISTER: `${AUTH}/${REGISTER}`,
  ACCOUNT_SETTINGS: `${ACCOUNT}/${SETTINGS}`,
  ACCOUNT_KEYS: `${ACCOUNT}/${API_KEYS}`,
  ACCOUNT_PORTFOLIO: `${ACCOUNT}/${PORTFOLIO}`,
} as const;

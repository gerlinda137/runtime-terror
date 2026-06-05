import { FULL_ROUTES, ROUTES } from "../../shared/constants";

export const SIDEBAR_ITEMS = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/'
  },
  {
    label: ROUTES.ACCOUNT,
    icon: 'account_circle',
    children: [
      { label: ROUTES.SETTINGS, link: FULL_ROUTES.ACCOUNT_SETTINGS },
      { label: ROUTES.API_KEYS, link: FULL_ROUTES.ACCOUNT_KEYS }
    ]
  },
];

import { FULL_ROUTES, ROUTES } from '../../shared/constants';

export const SIDEBAR_ITEMS = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/',
    isPublic: true
  },
  {
    label: 'Markets',
    icon: 'store',
    link: '/markets',
    isPublic: true
  },
  {
    label: 'About us',
    icon: 'groups',
    link: '/about-us',
    isPublic: true
  },
  {
    label: ROUTES.ACCOUNT,
    icon: 'account_circle',
    isPublic: false,
    children: [
      { label: ROUTES.SETTINGS, link: FULL_ROUTES.ACCOUNT_SETTINGS },
      { label: ROUTES.API_KEYS, link: FULL_ROUTES.ACCOUNT_KEYS },
      { label: ROUTES.PORTFOLIO, link: FULL_ROUTES.ACCOUNT_PORTFOLIO },
    ],
  },
  {
    label: 'Contact us', icon: 'contact_mail', link: ROUTES.CONTACT, isPublic: true
  },
];

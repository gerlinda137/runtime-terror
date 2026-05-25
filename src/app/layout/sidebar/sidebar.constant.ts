
export const SIDEBAR_ITEMS = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/'
  },
  {
    label: 'Analytics',
    icon: 'analytics',
    children: [
      { label: 'Overview', link: '/analytics/overview' },
      { label: 'Reports', link: '/analytics/reports' }
    ]
  },
  {
    label: 'Portfolio',
    icon: 'account_balance_wallet',
    children: [
      { label: 'My Assets', link: '/portfolio/assets' },
      { label: 'Transactions', link: '/portfolio/transactions' }
    ]
  }
];

import { Icons } from 'ui/UiIcon';

interface Route {
  iconName: Icons;
  path: string;
  name: string;
}
export const transporterRoutes: Route[] = [
  {
    path: '/available-jobs',
    name: 'Jobs',
    iconName: 'Jobs',
  },
  {
    path: '/my-trips',
    name: 'My Trips',
    iconName: 'TruckTick',
  },
  {
    path: '/payments',
    name: 'Payments',
    iconName: 'Moneys',
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    iconName: 'Truck',
  },
  {
    path: '/wallet',
    name: 'Wallet',
    iconName: 'Wallet',
  },
  {
    path: '/referrals',
    name: 'Referrals',
    iconName: 'People',
  },
  // {
  //   path: '/',
  //   name: 'Analytics',
  //   iconName: 'ChartSquare',
  // },
  {
    path: '/chat',
    name: 'Chat',
    iconName: 'Chat',
  },
  {
    path: '/profile',
    name: 'Settings',
    iconName: 'Settings',
  },
];

export const shipperRoutes: Route[] = [
  {
    path: '/my-trips',
    name: 'My Trips',
    iconName: 'TruckTick',
  },
  {
    path: '/wallet',
    name: 'Wallet',
    iconName: 'Wallet',
  },
  {
    path: '/referrals',
    name: 'Referrals',
    iconName: 'People',
  },
  {
    path: '/chat',
    name: 'Chat',
    iconName: 'Chat',
  },
  {
    path: '/profile',
    name: 'Settings',
    iconName: 'Settings',
  },
];

export default [...shipperRoutes, ...transporterRoutes];

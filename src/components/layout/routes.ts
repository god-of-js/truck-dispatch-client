import { useLocation } from 'react-router-dom';
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
  // {
  //   path: '/',
  //   name: 'Analytics',
  //   iconName: 'ChartSquare',
  // },
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
];

export default [...shipperRoutes, ...transporterRoutes];

import { Icons } from 'ui/UiIcon';

import Chiller from '../components/ui/icons/chiller.svg';
import TwentyFtTruck from '../components/ui/icons/20-ft-truck.svg';
import FlatBedImg from '../components/ui/icons/flatbed.svg';
import MiniVanImg from '../components/ui/icons/mini-van.svg';
import SemiTrailerImg from '../components/ui/icons/semi-trailer.svg';
import TrailerImg from '../components/ui/icons/trailer.svg';
import PickupVanImg from '../components/ui/icons/pick-up-van.svg';
import TankerImg from '../components/ui/icons/tanker.svg';
import VanImg from '../components/ui/icons/van.svg';

export const shippingLines = [
  'Maersk line',
  'Cosco',
  'Zim',
  'mol',
  'Hapagllyod',
  'CMA',
  'ARKAS',
  'MSC',
  'OOCL',
];

export const typeOfGoods = ['container', 'cargo'];

export const jobTypes = ['Empty', 'Import', 'Export'];

export const sizeOfContainer = ['20ft', '2 By 20ft', '40ft', '45ft'];

export const serviceBasedUserTypes = ['transporter', 'transportCompany'];

export const clientBasedUserTypes = ['shipper', 'company'];

export const userTypes = [...serviceBasedUserTypes, ...clientBasedUserTypes];

// Do not change order of array
export const tripStatuses = [
  'awaiting-bid',
  'assigned',
  'in-progress',
  'completed',
];

interface VehicleType {
  title: string;
  value: string;
  icon?: Icons;
  truckImg: any;
}
export const vehicleTypes: VehicleType[] = [
  {
    title: 'Trailer',
    value: 'trailer',
    truckImg: TrailerImg,
  },
  {
    title: 'Semi Trailer',
    value: 'semi-trailer',
    truckImg: SemiTrailerImg,
  },
  {
    title: 'Flatbed',
    value: 'flatbed',
    truckImg: FlatBedImg,
  },
  {
    title: 'Chiller',
    value: 'chiller',
    truckImg: Chiller,
  },
  {
    title: 'Tanker',
    value: 'tanker',
    truckImg: TankerImg,
  },
  {
    title: 'Pickup Van',
    value: 'pickup-van',
    truckImg: PickupVanImg,
  },
  {
    title: '20 ft Truck',
    value: '20-ft-truck',
    truckImg: TwentyFtTruck,
  },
  {
    title: 'Van',
    value: 'van',
    truckImg: VanImg,
  },
  {
    title: 'Mini Van',
    value: 'mini-van',
    truckImg: MiniVanImg,
  },
];

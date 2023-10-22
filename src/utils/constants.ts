import { Icons } from 'ui/UiIcon';

import Chiller from '../assets/img/chiller.svg';
import TwentyFtTruck from '../assets/img/20-ft-truck.svg';
import FlatBedImg from '../assets/img/flatbed.svg';
import MiniVanImg from '../assets/img/mini-van.svg';
import SemiTrailerImg from '../assets/img/semi-trailer.svg';
import TrailerImg from '../assets/img/trailer.svg';
import PickupVanImg from '../assets/img/pick-up-van.svg';
import TankerImg from '../assets/img/tanker.svg';
import VanImg from '../assets/img/van.svg';
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

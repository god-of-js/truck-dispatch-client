import { Icons } from 'ui/UiIcon';

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

export const clientBasedUserTypes = ['agent', 'company'];

export const userTypes = [...serviceBasedUserTypes, ...clientBasedUserTypes];

export const tripStatuses = [
  'awaiting-bid',
  'payment-complete',
  'in-progress',
  'completed',
];

interface VehicleType {
  title: string;
  value: string;
  image: Icons;
}
export const vehicleType: VehicleType[] = [
  {
    title: 'Trailer',
    value: 'trailer',
    image: 'Trailer',
  },
  {
    title: 'Semi Trailer',
    value: 'semi-trailer',
    image: 'SemiTrailer',
  },
  {
    title: 'Flatbed',
    value: 'flatbed',
    image: 'FlatBed',
  },
  {
    title: 'Chiller',
    value: 'chiller',
    image: 'Chiller',
  },
  {
    title: 'Tanker',
    value: 'tanker',
    image: 'Tanker',
  },
  {
    title: 'Pickup Van',
    value: 'pickup-van',
    image: 'PickUpVan',
  },
  {
    title: '20 ft Truck',
    value: '20-ft-truck',
    image: 'TwentyFTTruck',
  },
  {
    title: 'Van',
    value: 'van',
    image: 'Van',
  },
  {
    title: 'Mini Van',
    value: 'mini-van',
    image: 'MiniVan',
  },
];

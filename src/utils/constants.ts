import { Icons } from "ui/UiIcon";

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
  icon: Icons;
}
export const vehicleTypes: VehicleType[] = [
  {
    title: 'Trailer',
    value: 'trailer',
    icon: 'Trailer',
  },
  {
    title: 'Semi Trailer',
    value: 'semi-trailer',
    icon: 'SemiTrailer',
  },
  {
    title: 'Flatbed',
    value: 'flatbed',
    icon: 'FlatBed',
  },
  {
    title: 'Chiller',
    value: 'chiller',
    icon: 'Chiller',
  },
  {
    title: 'Tanker',
    value: 'tanker',
    icon: 'Tanker',
  },
  {
    title: 'Pickup Van',
    value: 'pickup-van',
    icon: 'PickUpVan',
  },
  {
    title: '20 ft Truck',
    value: '20-ft-truck',
    icon: 'TwentyFTTruck',
  },
  {
    title: 'Van',
    value: 'van',
    icon: 'Van',
  },
  {
    title: 'Mini Van',
    value: 'mini-van',
    icon: 'MiniVan',
  },
];
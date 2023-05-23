import {
  jobTypes,
  shippingLines,
  sizeOfContainer,
  typeOfGoods,
} from 'utils/constants';
import User from './User';

export default interface Trip {
  _id: string;
  pickUpAddress: string;
  deliveryAddress: string;
  pickUpDate: string;
  deliveryDate: string;
  typeOfGoods: (typeof typeOfGoods)[number];
  sizeOfContainer?: (typeof sizeOfContainer)[number];
  shippingLine?: (typeof shippingLines)[number];
  jobType?: (typeof jobTypes)[number];
  weight: number;
  instructions?: string;
  tripOwnerUserType?: string;
  transporter?: User;
  tripOwner: User;
  TDO?: string;
  reference: string;
  status: 'awaiting-bid' | 'payment-complete' | 'in-progress' | 'completed';
}

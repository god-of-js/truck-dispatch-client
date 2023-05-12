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
  shipperId: string;
  transporterId?: string;
  TDO?: string;
  paymentId?: string;
  reference: string;
  transporter?: User;
  tripOwner?: User;
  status: 'awaiting-bid' | 'payment-complete' | 'in-progress' | 'completed';
}

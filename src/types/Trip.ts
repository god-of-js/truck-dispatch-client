import {
  jobTypes,
  shippingLines,
  sizeOfContainer,
  typeOfGoods,
} from 'utils/constants';
import User from './User';
import PaymentRequest from './PaymentRequest';
import Bid from './Bid';
export default interface Trip {
  _id: string;
  pickUpAddress: string;
  deliveryAddress: string;
  acceptedBid: Bid;
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
  status: 'awaiting-bid' | 'assigned' | 'in-progress' | 'completed';
  paymentRequest?: PaymentRequest;
  shipperBidPrice?: number;
}

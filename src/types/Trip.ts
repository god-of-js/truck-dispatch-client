import { shippingLines, sizeOfContainer, typeOfGoods } from 'utils/constants';

export default interface Trip {
  id: string;
  pickUpAddress: string;
  deliveryAddress: string;
  pickUpDate: string;
  deliveryDate: string;
  typeOfGoods: (typeof typeOfGoods)[number];
  sizeOfContainer?: (typeof sizeOfContainer)[number];
  shippingLine?: (typeof shippingLines)[number];
  weight: number;
  description?: string;
  agentId: string;
  transporterId?: string;
  paymentId?: string;
  status: 'awaiting_bid' | 'payment_complete' | 'in-progress' | 'completed';
}

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
  responsibleTransporter?: string;
  status:
    | 'awaiting_transporter'
    | 'awaiting_payment'
    | 'paid'
    | 'in-progress'
    | 'completed';
}

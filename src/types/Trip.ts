import {
  shippingLines,
  sizeOfContainer,
  typeOfGoods,
} from '../utils/constants';

export default interface Trip {
  pickUpAddress: string;
  deliveryAddress: string;
  pickUpDate: string;
  deliveryDate: string;
  typeOfGoods: (typeof typeOfGoods)[number];
  sizeOfContainer?: (typeof sizeOfContainer)[number];
  shippingLine?: (typeof shippingLines)[number];
  weight: number;
  description?: string;
}

export default interface NewTrip {
  pickUpAddress: string;
  deliveryAddress: string;
  pickUpDate: string;
  deliveryDate: string;
  typeOfGoods: string;
  jobType: string;
  sizeOfContainer: string;
  shippingLine: string;
  weight: number;
  instructions: string;
  shipperBidPrice: number;
}

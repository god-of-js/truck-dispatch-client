export default interface Payment {
  from: string;
  to: string;
  _id: string;
  tripId: string;
  bidId: string;
  reference: string;
  transaction: string;
  tripReference: string;
  amountInBid: number;
  totalAmountPaid: number;
}

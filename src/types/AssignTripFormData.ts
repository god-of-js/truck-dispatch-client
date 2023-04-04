export default interface AssignTripFormData {
  from: string;
  to: string;
  tripId: string;
  bidId: string;
  paymentReference: string;
  amountInBid: number;
  totalAmountPaid: number;
  transaction: string;
}

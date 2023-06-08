export default interface AssignTripFormData {
  from: string;
  to: string;
  tripId: string;
  bidId: string;
  processorReference?: string;
  amountInBid: number;
  totalAmountPaid: number;
  transaction: string;
  paymentSource: 'balance' | 'paystack';
}

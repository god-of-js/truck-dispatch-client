import PaymentMethod from "./enums/PaymentMethod";

export default interface AssignTripFormData {
  from: string;
  to: string;
  tripId: string;
  bidId: string;
  processorReference?: string;
  amountInBid: number;
  totalAmountPaid: number;
  transaction?: string;
  PaymentMethod: PaymentMethod;
}
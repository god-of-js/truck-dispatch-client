import Trip from './Trip';
import Vehicle from './Vehicle';
import PaymentRequestStatus from './enums/PaymentRequestStatus';

export default interface PaymentRequest {
  _id: string;
  vehicle: Vehicle;
  proofVideo: string;
  status: PaymentRequestStatus;
  transporterId: string;
  trip: Trip;
  tripReference: string;
  paymentReference?: string;
  reference: string;
  amount: number;
  reasonForReject?: string;
  createdAt?: number;
  updatedAt?: number;
}

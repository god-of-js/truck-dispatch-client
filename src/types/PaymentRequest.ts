import Vehicle from './Vehicle';

export default interface PaymentRequest {
  trip: any;
  _id: string;
  vehicle: Vehicle;
  proofVideo: string;
  status: 'pending' | 'rejected' | 'completed';
  transporterId: string;
  tripId: string;
  tripReference: string;
  paymentReference?: string;
  reference: string;
  amount: number;
  reasonForReject?: string;
  createdAt?: number;
  updatedAt?: number;
}

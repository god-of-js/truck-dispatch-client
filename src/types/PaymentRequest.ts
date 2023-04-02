export default interface PaymentRequest {
  id: string;
  driverName: string;
  driverPhoneNumber: string;
  proofVideo: File | null | string;
  status: 'pending' | 'rejected' | 'completed';
  transporterId: string;
  tripId: string;
  truckPlateNumber: string;
  tripReference: string;
  createdAt?: number;
  updatedAt?: number;
  paymentReference?: string;
  reference?: string;
  amount?: number;
  agentRemark?: string;
}

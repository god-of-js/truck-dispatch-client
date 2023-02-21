import Asset from './Asset';

export default interface PaymentRequest {
  id: string;
  driverName: string;
  driverPhoneNumber: string;
  containerVideo: File | null | Asset;
  status: 'pending' | 'rejected' | 'completed';
  transporterId: string;
  tripId: string;
}

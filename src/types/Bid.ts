import User from './User';
import Vehicle from './Vehicle';

export default interface Bid {
  _id: string;
  paymentId?: string;
  extraNotes?: string;
  price: number;
  presentLocation?: string;
  transporterId: string;
  vehicle: Vehicle;
  tripId: string;
  status?: 'pending' | 'accepted' | 'rejected';
  transporter: User;
}

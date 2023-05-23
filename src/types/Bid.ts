import Trip from './Trip';
import User from './User';
import Vehicle from './Vehicle';

export default interface Bid {
  _id: string;
  paymentId?: string;
  extraNotes?: string;
  price: number;
  presentLocation?: string;
  vehicle: Vehicle;
  trip: string;
  status?: 'pending' | 'accepted' | 'rejected';
  transporter: User;
}

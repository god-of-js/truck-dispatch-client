import Trip from './Trip';
import User from './User';
import Vehicle from './Vehicle';
import BidStatus from './enums/BidStatus';

export default interface Bid {
  _id: string;
  paymentId?: string;
  extraNotes?: string;
  price: number;
  presentLocation?: string;
  vehicle: Vehicle;
  trip: Trip;
  status?: BidStatus;
  transporter: User;
  createdAt: string;
  updatedAt: string;
}

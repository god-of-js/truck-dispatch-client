import User from './User';

export default interface Bid {
  _id: string;
  paymentId?: string;
  extraNotes?: string;
  price: number;
  presentLocation?: string;
  transporterId: string;
  driverName: string;
  truckPlateNumber: string;
  tripId: string;
  status?: 'pending' | 'accepted' | 'rejected';
  transporter: User;
}

import Vehicle from './Vehicle';

export default interface CreateBid {
  price: number;
  presentLocation: string;
  vehicle: Vehicle;
  vehicleId: string;
  tripId: string;
  extraNotes: string;
}

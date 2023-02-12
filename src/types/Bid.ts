export default interface Bid {
  id: string;
  extraNotes?: string;
  price: number;
  presentLocation?: string;
  transporterId: string;
  tripId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

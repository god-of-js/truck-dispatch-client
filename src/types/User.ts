export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string | File;
  userType: 'agent' | 'transporter' | 'company' | 'transport_company';
  status?:
    | 'pending_verification'
    | 'verified'
    | 'unverified'
    | 'rejected'
    | 'fraudulent';
  rating: number;
  createdAt?: number;
}

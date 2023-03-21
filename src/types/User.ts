
export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string | File;
  userType: 'agent' | 'transporter';
  status?:
    | 'pending_verification'
    | 'verified'
    | 'unverified'
    | 'rejected'
    | 'fraudulent';
  rating: number;
  createdAt?: number;
}

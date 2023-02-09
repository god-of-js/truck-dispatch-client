import Asset from "./Asset";

export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: Asset;
  userType: 'agent' | 'transporter';
  status?: 'pending_verification' | 'verified' | 'unverified' | 'rejected';
}

export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  status?: 'pending_verification' | 'verified' | 'unverified';
}

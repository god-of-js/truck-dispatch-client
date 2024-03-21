import User from './User';

export default interface Referral {
  _id: string;
  referrer: User;
  referred: User;
  commission: number;
  // TODO: make an enum ReferralStatus
  status: 'pending' | 'completed';
  createdAt: string | number;
}

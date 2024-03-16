import { userTypes } from 'utils/constants';
import TransferRecipient from './TransferRecipient';
import UserStatus from './enums/UserStatus';

export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance?: number;
  escrowBalance?: number;
  phone: string;
  avatar?: string;
  completedTrips?: number;
  userType: (typeof userTypes)[number];
  status?: UserStatus;
  rating: number;
  bankDetails?: TransferRecipient;
  password: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  createdAt?: number;
  noOfVehicles?: number;
  referralCode?: string;
  referrerCode: string;
}

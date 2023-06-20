import User from './User';

export default interface Verification {
  _id: string;
  idType: string;
  idDoc: File | null | string;
  homeAddress: string;
  homeUtilityBill: File | null | string;
  garageAddress: string;
  officeAddress: string;
  guarantor: {
    name: string;
    email: string;
    phone: string;
    homeAddress: string;
    idType: string;
    idDoc: File | null | string;
  };
  adminMessage?: string;
  user?: User;
}

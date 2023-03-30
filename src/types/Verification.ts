export default interface Verification {
  idType: string;
  idDoc: File | null | string;
  homeAddress: string;
  homeUtilityBill: File | null | string;
  garageAddress: string;
  officeAddress: string;
  userId: string;
  response?: string;
  guarantor: {
    name: string;
    email: string;
    phone: string;
    homeAddress: string;
    idType: string;
    idDoc: File | null | string;
  };
  adminMessage?: string;
}

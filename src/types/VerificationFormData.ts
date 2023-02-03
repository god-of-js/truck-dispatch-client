import Asset from './Asset';

export default interface VerificationFormData {
  idType: string;
  idDoc: File | null | Asset;
  homeAddress: string;
  userId: string;
  response?: string;
}

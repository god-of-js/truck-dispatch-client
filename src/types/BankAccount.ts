export default interface BankAccount {
  type: string;
  name: string;
  account_number: string;
  bank_code: string;
  currency: string;
  reference?: string;
  userId: string;
  id: string;
  bank_name: string;
  paystackRecipientCode: string;
  paystackRecipientId: string;
}

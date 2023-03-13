import axios from 'axios';
import BankAccount from 'types/BankAccount';
const paystackSecretKey = 'sk_test_1c16bbc1f932d4269d744f67211c30fab3961dda';

const instance = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${paystackSecretKey}`,
  },
});

export interface Bank {
  name: string;
  code: string;
}
export function loadBanks(): Promise<Bank[]> {
  return instance.get('/bank?currency=NGN').then(({ data }) => data.data);
}

export function loadAccountDetails(bankCode: string, accountNumber: string) {
  return instance
    .get(`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`)
    .then(({ data }) => data.data);
}

export function createTransferRecipient(details: Record<string, string>) {
  return instance
    .post('/transferrecipient', details)
    .then(({ data }) => data.data);
}
export function makeTransfer(details: Record<string, string | number>) {
  return instance.post('/transfer', details).then(({ data }) => data);
}

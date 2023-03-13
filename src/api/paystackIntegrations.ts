import axios from 'axios';
import TransferRecipient from 'types/TransferRecipient';
import { paystackPrivateKey } from 'utils/privateKeys';

const instance = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${paystackPrivateKey}`,
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

export function createTransferRecipient(details: TransferRecipient) {
  return instance
    .post('/transferrecipient', details)
    .then(({ data }) => data.data);
}

export function deleteTransferRecipient(recipientId: string) {
  return instance.delete(`/transferrecipient/${recipientId}`);
}

export function makeTransfer(details: Record<string, string | number>) {
  return instance.post('/transfer', details).then(({ data }) => data);
}

import Api from './index';

export interface Bank {
  name: string;
  code: string;
}
export function loadBanks(): Promise<Bank[]> {
  return Api.getBanks().then((data) => data);
}

export function loadAccountDetails(bankCode: string, accountNumber: string) {
  return Api.loadAccountDetails(bankCode, accountNumber).then((data) => data);
}

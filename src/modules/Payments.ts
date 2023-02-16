import { createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Payment from 'types/Payment';

export interface PaymentsState {
  payment: [];
}
const initialState: PaymentsState = {
  payment: [],
};
export const paymentsSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
});

export default paymentsSlice.reducer;

export function createOrUpdatePayment(data: Payment) {
  return () => {
    if (!data.userId) throw new Error('400: user id been sent');
    return Api.createOrUpdatePayment(data).catch((err) => console.log(err));
  };
}

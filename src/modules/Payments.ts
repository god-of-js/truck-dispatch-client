import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Payment from 'types/Payment';
import PaymentRequest from 'types/PaymentRequest';
import { AppDispatch, AppState, RootState } from '.';

export interface PaymentsState {
  payment: Payment[];
  paymentRequests: PaymentRequest[];
  paymentRequest: PaymentRequest | null;
}
const initialState: PaymentsState = {
  payment: [],
  paymentRequests: [],
  paymentRequest: null,
};
export const paymentsSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentRequests(
      state: PaymentsState,
      action: { payload: PaymentRequest[] },
    ) {
      state.paymentRequests = action.payload;
    },
    setPaymentRequest(
      state: PaymentsState,
      action: { payload: PaymentRequest },
    ) {
      state.paymentRequest = action.payload;
    },
  },
});

export const { setPaymentRequests, setPaymentRequest } = paymentsSlice.actions;

export default paymentsSlice.reducer;

const paymentRequests = (state: RootState) => state.payment.paymentRequests;

export const selectPaymentRequestByTripId = (id: string) =>
  createSelector(paymentRequests, (requestArr) =>
    requestArr.find(({ trip }) => trip._id === id),
  );

export function getPaymentRequestsOfDriver() {
  return (dispatch: AppDispatch) => {
    return Api.getPaymentRequestsOfDriver().then((data) => {
      dispatch(setPaymentRequests(data));
      return data;
    });
  };
}

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
    requestArr.find(({ tripId }) => tripId === id),
  );

export function createOrUpdatePayment(data: Payment) {
  return () => {
    if (!data.userId) throw new Error('400: user id been sent');
    return Api.createOrUpdatePayment(data).catch((err) => console.log(err));
  };
}

export function requestPaymentByTransporter(data: PaymentRequest) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.requestPaymentByTransporter(data).then(() => {
      dispatch(setPaymentRequests([...state().payment.paymentRequests, data]));
    });
  };
}

export function getPaymentRequestsOfDriver() {
  return (dispatch: AppDispatch, state: AppState) => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('400: user is not authenticated');
    return Api.getPaymentRequestsOfDriver(uid).then((data) => {
      dispatch(setPaymentRequests(data));
      return data;
    });
  };
}

export function getPaymentRequestByTripId(tripId?: string) {
  return (dispatch: AppDispatch) => {
    if (!tripId) throw new Error('400: Trip ID was not sent.');

    return Api.getPaymentRequestByTripId(tripId).then((paymentRequest) => {
      dispatch(setPaymentRequest(paymentRequest));
    });
  };
}

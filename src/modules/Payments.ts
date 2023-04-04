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

export function requestPaymentByTransporter(data: FormData, tripId: string) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.requestPaymentByTransporter(data, tripId).then(
      (paymentRequestDetails) => {
        dispatch(setPaymentRequest(paymentRequestDetails));
      },
    );
  };
}

export function updatePaymentRequestByTransporter(
  data: FormData,
  tripId: string,
  paymentRequestId: string,
) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.updatePaymentRequest(data, tripId, paymentRequestId).then(
      (paymentRequestDetails) => {
        dispatch(setPaymentRequest(paymentRequestDetails));
      },
    );
  };
}

export function getPaymentRequestsOfDriver() {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.getPaymentRequestsOfDriver().then((data) => {
      dispatch(setPaymentRequests(data));
      return data;
    });
  };
}

export function getPaymentRequestByTripId(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getPaymentRequestByTripId(tripId).then((paymentRequest) => {
      console.log(paymentRequest, 'payment request');
      dispatch(setPaymentRequest(paymentRequest));
    });
  };
}

export function rejectPaymentRequest(
  tripId: string,
  paymentRequestId: string,
  data: { reasonForReject: string },
) {
  return (dispatch: AppDispatch) => {
    return Api.rejectPaymentRequest(tripId, paymentRequestId, data).then(
      (paymentRequest) => {
        dispatch(setPaymentRequest(paymentRequest));
      },
    );
  };
}
export function approvePaymentRequest(
  tripId: string,
  paymentRequestId: string,
) {
  return (dispatch: AppDispatch) => {
    return Api.approvePaymentRequest(tripId, paymentRequestId).then(
      (paymentRequest) => {
        dispatch(setPaymentRequest(paymentRequest));
      },
    );
  };
}

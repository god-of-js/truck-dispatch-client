import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import Account, { AccountState } from './Account';
import Trips, { TripState } from './Trips';
import Payment, { PaymentsState } from './Payments';

const store = configureStore({
  reducer: {
    account: Account,
    trips: Trips,
    payment: Payment,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export interface RootState {
  account: AccountState;
  trips: TripState;
  payment: PaymentsState;
}
export default function getStore() {
  return store;
}

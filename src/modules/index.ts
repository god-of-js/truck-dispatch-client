import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import Account, { AccountState } from './Account';
import Trips, { TripState } from './Trips';
import Ratings, { RatingsState } from './Ratings';
import Payment, { PaymentsState } from './Payments';
import Chat, { ChatState } from './Chat';

const store = configureStore({
  reducer: {
    account: Account,
    trips: Trips,
    payment: Payment,
    ratings: Ratings,
    chat: Chat,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export interface RootState {
  account: AccountState;
  trips: TripState;
  payment: PaymentsState;
  ratings: RatingsState;
  chat: ChatState;
}

export default function getStore() {
  return store;
}

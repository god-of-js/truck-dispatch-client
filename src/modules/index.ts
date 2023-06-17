import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import Account, { AccountState } from './Account';
import Bid, { BidState } from './Bid';
import Chat, { ChatState } from './Chat';
import Payment, { PaymentsState } from './Payments';
import Ratings, { RatingsState } from './Ratings';
import Trips, { TripState } from './Trips';
import Vehicle, { VehicleState } from './Vehicle';
import Verification, { VerificationState } from './Verification';

const store = configureStore({
  reducer: {
    account: Account,
    bid: Bid,
    chat: Chat,
    payment: Payment,
    ratings: Ratings,
    trips: Trips,
    vehicle: Vehicle,
    verification: Verification,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export interface RootState {
  account: AccountState;
  bid: BidState;
  chat: ChatState;
  payment: PaymentsState;
  ratings: RatingsState;
  trips: TripState;
  vehicle: VehicleState;
  verification: VerificationState;
}

export default function getStore() {
  return store;
}

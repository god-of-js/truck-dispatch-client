import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import Account from './Account';

const store = configureStore({
  reducer: {
    account: Account,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export default function getStore() {
  return store;
}

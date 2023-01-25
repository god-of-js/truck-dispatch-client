import { configureStore } from '@reduxjs/toolkit';
import Account from './Account';
const store = configureStore({
  reducer: {
    account: Account,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export default function getStore() {
  return store;
}

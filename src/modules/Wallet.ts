import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Bid from 'types/Bid';
import CreateBid from 'types/CreateBid';
import { AppDispatch, AppState, RootState } from '.';

export interface WalletState {
  transactions: unknown[];
}
const initialState: WalletState = {
  transactions: [],
};

export const walletSlice = createSlice({
  name: 'Wallet',
  initialState,
  reducers: {},
});

export const {} = walletSlice.actions;
export default walletSlice.reducer;

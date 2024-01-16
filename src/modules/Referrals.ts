import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Referral from 'types/Referral';
import { AppDispatch, AppState, RootState } from '.';

export interface ReferralState {
  referrals: Referral[];
}
const initialState: ReferralState = {
  referrals: [],
};

export const ReferralsSlice = createSlice({
  name: 'Referrals',
  initialState,
  reducers: {
    setReferrals: (state: ReferralState, action: { payload: Referral[] }) => {
      state.referrals = action.payload;
    },
  },
});

export const { setReferrals } = ReferralsSlice.actions;
export default ReferralsSlice.reducer;

export function getReferrals() {
  return (dispatch: AppDispatch) => {
    return Api.getReferrals().then((data) => {
      dispatch(setReferrals(data));
    });
  };
}

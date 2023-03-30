import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Bid from 'types/Bid';
import { AppDispatch, RootState } from '.';

export interface BidState {
  bids: Bid[];
}
const initialState: BidState = {
  bids: [],
};

export const BidsSlice = createSlice({
  name: 'Bids',
  initialState,
  reducers: {
    setBids: (state: BidState, action: { payload: Bid[] }) => {
      state.bids = action.payload;
    },
  },
});
export const { setBids } = BidsSlice.actions;
export default BidsSlice.reducer;

const bids = (state: RootState) => state.bid.bids;
export const selectBid = (
  valueToQueryWith: string,
  queryParam: '_id' | 'transporterId' = '_id',
) =>
  createSelector(bids, (bidArr: Bid[]) => {
    return bidArr.find((bid) => valueToQueryWith === bid[queryParam]);
  });

export function getBidsWithTripId(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getBidsWithTripId(tripId).then((data) => {
      dispatch(setBids(data));
    });
  };
}

export function createOrUpdateBid(data: Bid) {
  return () => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.createOrUpdateBid(data);
  };
}

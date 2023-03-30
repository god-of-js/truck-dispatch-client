import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Bid from 'types/Bid';
import { AppDispatch, AppState, RootState } from '.';

export interface BidState {
  bids: Bid[];
  bid: Bid | null;
}
const initialState: BidState = {
  bids: [],
  bid: null,
};

export const BidsSlice = createSlice({
  name: 'Bids',
  initialState,
  reducers: {
    setBids: (state: BidState, action: { payload: Bid[] }) => {
      state.bids = action.payload;
    },
    setBid: (state: BidState, action: { payload: Bid }) => {
      state.bid = action.payload;
    },
  },
});

export const { setBids, setBid } = BidsSlice.actions;
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

export function getTransporterBidWithTripId(tripId: string) {
  return (dispatch: AppDispatch, state: AppState) => {
    // Trip has already been loaded.
    if (state().bid.bid?.tripId === tripId) return;
    return Api.getTransporterBidWithTripId(tripId).then((data) => {
      dispatch(setBid(data));
    });
  };
}

export function createBid(data: Bid) {
  return (dispatch: AppDispatch) => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.createBid(data).then((bid) => {
      console.log(bid)
      dispatch(setBid(bid));
      return bid;
    });
  };
}

export function updateBid(data: Bid) {
  return (dispatch: AppDispatch) => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.updateBid(data).then((bid) => {
      console.log(bid)
      dispatch(setBid(bid));
      return bid;
    });
  };
}

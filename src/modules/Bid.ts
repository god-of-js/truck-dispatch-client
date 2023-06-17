import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Bid from 'types/Bid';
import CreateBid from 'types/CreateBid';
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
      const bid = state.bids.find(({ _id }) => _id === action.payload._id);

      if (bid) {
        Object.assign(bid, action.payload);
        return;
      }
      state.bids.push(action.payload);
    },
    removeBid: (state: BidState, action: { payload: string }) => {
      const indexOfDeletedBid = state.bids.findIndex(
        ({ _id }) => _id === action.payload,
      );

      if (indexOfDeletedBid === -1) return;

      state.bids.splice(indexOfDeletedBid, 1);
    },
  },
});

export const { setBids, setBid, removeBid } = BidsSlice.actions;
export default BidsSlice.reducer;

const bids = (state: RootState) => state.bid.bids;
export const selectBid = (
  valueToQueryWith: string,
  queryParam: '_id' | 'transporter' | 'trip' = '_id',
) =>
  createSelector(bids, (bidArr: Bid[]) => {
    return bidArr.find((bid) => {
      if (queryParam === 'transporter')
        return valueToQueryWith === bid.transporter._id;

      if (queryParam === 'trip') return valueToQueryWith === bid.trip._id;

      return valueToQueryWith === bid[queryParam];
    });
  });

export function getBidsWithTripId(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getBidsWithTripId(tripId).then((data) => {
      dispatch(setBids(data));
    });
  };
}

export function getTransporterBids() {
  return (dispatch: AppDispatch) => {
    return Api.getTransporterBids().then((data) => {
      dispatch(setBids(data));
    });
  };
}

export function createBid(data: CreateBid) {
  return (dispatch: AppDispatch) => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.createBid(data).then((bid) => {
      dispatch(setBid(bid));
      return bid;
    });
  };
}

export function updateBid(data: CreateBid) {
  return (dispatch: AppDispatch) => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.updateBid(data).then((bid) => {
      dispatch(setBid(bid));
      return bid;
    });
  };
}

export function deleteBid(bidId: string, tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.deleteBid(bidId, tripId).then(() => {
      dispatch(removeBid(bidId));
    });
  };
}

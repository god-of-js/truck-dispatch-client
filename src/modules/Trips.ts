import { createSelector, createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import { AppDispatch, RootState } from '.';
import Api from 'Api';
import { toAnyAction } from 'utils/helpers';
import Bid from 'types/Bid';

export interface TripState {
  trips: Trip[];
  transporterJobs: Trip[];
  bids: Bid[];
}
const initialState: TripState = {
  trips: [],
  transporterJobs: [],
  bids: [],
};

export const TripsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setTrips: (state: TripState, action: { payload: Trip[] }) => {
      state.trips = action.payload;
    },
    setTransporterJobs: (state: TripState, action: { payload: Trip[] }) => {
      state.transporterJobs = action.payload;
    },
    setBids: (state: TripState, action: { payload: Bid[] }) => {
      state.bids = action.payload;
    },
  },
});

export const { setTrips, setTransporterJobs, setBids } = TripsSlice.actions;
export default TripsSlice.reducer;

// SELECTORS
const transporterJobs = (state: RootState) => state.trips.transporterJobs;
export const selectTransporterJob = (jobId: string) =>
  createSelector(transporterJobs, (jobs: Trip[]) =>
    jobs.find(({ id }) => id === jobId),
  );

const bids = (state: RootState) => state.trips.bids;
export const selectBid = (
  valueToQueryWith: string,
  queryParam: 'id' | 'transporterId',
) =>
  createSelector(bids, (bidArr: Bid[]) => {
    return bidArr.find((bid) => valueToQueryWith === bid[queryParam]);
  });

// ASYNC THUNKS
export function createOrUpdateTrip(data: Trip) {
  return () => {
    return Api.createOrUpdateTrip(data);
  };
}

export function getAgentTrips(agentId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getAgentTrips(agentId).then((data) =>
      dispatch(toAnyAction(setTrips(data))),
    );
  };
}

export function getTransporterTrips(transporterId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getTransporterTrips(transporterId).then((data) =>
      dispatch(toAnyAction(setTrips(data))),
    );
  };
}

export function getTransporterJobs() {
  return (dispatch: AppDispatch) => {
    return Api.getTransporterJobs().then((data) =>
      dispatch(toAnyAction(setTransporterJobs(data))),
    );
  };
}

export function submitBid(data: Bid) {
  return (dispatch: AppDispatch) => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.submitBid(data);
  };
}

export function getBidsWithTripId(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getBidsWithTripId(tripId).then((data) => {
      dispatch(setBids(data));
    });
  };
}

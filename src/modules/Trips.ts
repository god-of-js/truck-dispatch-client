import { createSelector, createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import { AppDispatch, RootState } from '.';
import Api from 'Api';
import { toAnyAction } from 'utils/helpers';
import Bid from 'types/Bid';

export interface TripState {
  trips: Trip[];
  jobs: Trip[];
  bids: Bid[];
}
const initialState: TripState = {
  trips: [],
  jobs: [],
  bids: [],
};

export const TripsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setTrips: (state: TripState, action: { payload: Trip[] }) => {
      state.trips = action.payload;
    },
    setJobs: (state: TripState, action: { payload: Trip[] }) => {
      state.jobs = action.payload;
    },
    setBids: (state: TripState, action: { payload: Bid[] }) => {
      state.bids = action.payload;
    },
  },
});

export const { setTrips, setJobs, setBids } = TripsSlice.actions;
export default TripsSlice.reducer;

// SELECTORS
const trips = (state: RootState) => state.trips.trips;
export const selectTrip = (tripId: string) =>
  createSelector(trips, (trips: Trip[]) =>
    trips.find((trip) => trip.id === tripId),
  );
const jobs = (state: RootState) => state.trips.jobs;
export const selectJob = (jobId: string) =>
  createSelector(jobs, (jobs: Trip[]) => jobs.find(({ id }) => id === jobId));

const bids = (state: RootState) => state.trips.bids;
export const selectBid = (
  valueToQueryWith: string,
  queryParam: 'id' | 'transporterId' = 'id',
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
// Prevent default is used to notify the store that this is not the normal flow, hence we do not need to set the value to state.
export function getTransporterTrips(
  transporterId: string = localStorage.getItem('uid')!,
  preventDefault?: boolean,
) {
  if (!transporterId) throw new Error('400: transporter ID is not present');
  return (dispatch: AppDispatch) => {
    return Api.getTransporterTrips(transporterId).then((data) => {
      !preventDefault && dispatch(toAnyAction(setTrips(data)));
      return data;
    });
  };
}

export function getJobs() {
  return (dispatch: AppDispatch) => {
    return Api.getJobs().then((data) => dispatch(toAnyAction(setJobs(data))));
  };
}

export function createOrUpdateBid(data: Bid) {
  return () => {
    if (!data.tripId) throw new Error('400: No trip id been sent');
    return Api.createOrUpdateBid(data);
  };
}

export function getBidsWithTripId(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getBidsWithTripId(tripId).then((data) => {
      dispatch(setBids(data));
    });
  };
}

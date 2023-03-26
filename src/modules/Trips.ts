import { createSelector, createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import { AppDispatch, AppState, RootState } from '.';
import Api from 'Api';
import { replaceEditedItem, toAnyAction } from 'utils/helpers';
import Bid from 'types/Bid';
import NewTrip from 'types/NewTrip';

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
    trips.find((trip) => trip._id === tripId),
  );
const jobs = (state: RootState) => state.trips.jobs;
export const selectJob = (jobId: string) =>
  createSelector(jobs, (jobs: Trip[]) => jobs.find(({ _id }) => _id === jobId));

const bids = (state: RootState) => state.trips.bids;
export const selectBid = (
  valueToQueryWith: string,
  queryParam: 'id' | 'transporterId' = 'id',
) =>
  createSelector(bids, (bidArr: Bid[]) => {
    return bidArr.find((bid) => valueToQueryWith === bid[queryParam]);
  });

// ASYNC THUNKS
export function createTrip(trip: NewTrip) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.createTrip(trip).then((data) => {
      dispatch(setTrips([...state().trips.trips, data]));
      return data;
    });
  };
}
export function updateTrip(trip: Partial<Trip>) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.updateTrip(trip).then((data) => {
      const trips = replaceEditedItem(state().trips.trips, data);
      dispatch(setTrips(trips));
      return data;
    });
  };
}

export function getTrips() {
  return (dispatch: AppDispatch) => {
    return Api.getTrips().then((data) => dispatch(setTrips(data)));
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

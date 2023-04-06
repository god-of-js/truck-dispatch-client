import { createSelector, createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import { AppDispatch, AppState, RootState } from '.';
import Api from 'Api';
import { replaceEditedItem, toAnyAction } from 'utils/helpers';
import NewTrip from 'types/NewTrip';
import AssignTripFormData from 'types/AssignTripFormData';

export interface TripState {
  trips: Trip[];
  jobs: Trip[];
}
const initialState: TripState = {
  trips: [],
  jobs: [],
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
  },
});

export const { setTrips, setJobs } = TripsSlice.actions;
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

// ASYNC THUNKS
export function createTrip(trip: NewTrip) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.createTrip(trip).then((data) => {
      dispatch(setTrips([...state().trips.trips, data]));
      return data;
    });
  };
}

export function assignTrip(trip: AssignTripFormData) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.assignTrip(trip).then((data) => {
      const trips = replaceEditedItem(state().trips.trips, data);
      dispatch(setTrips(trips));
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

export function updateTripStatus(tripId: string, status: Trip['status']) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.updateTripStatus(tripId, status).then((data) => {
      const trip = state().trips.trips.find(({ _id }) => _id === tripId);
      const trips = replaceEditedItem(state().trips.trips, {
        ...trip!,
        status: data.status,
      });
      dispatch(setTrips(trips));
      return data;
    });
  };
}

export function getTrips() {
  return (dispatch: AppDispatch) => {
    return Api.getTrips().then((data) => {
      dispatch(setTrips(data));
    });
  };
}

export function getJobs() {
  return (dispatch: AppDispatch) => {
    return Api.getJobs().then((data) => dispatch(setJobs(data)));
  };
}

export function uploadTDO(formData: FormData, tripId: string) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.uploadTDO(formData, tripId).then((data) => {
      const trips = replaceEditedItem(state().trips.trips, data);
      dispatch(setTrips(trips));
      return data;
    });
  };
}

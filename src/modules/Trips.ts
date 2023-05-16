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
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state: TripState, action: { payload: Trip[] }) => {
      state.trips = action.payload;
    },
    appendTrips: (state: TripState, action: { payload: Trip[] }) => {
      state.trips.push(...action.payload);
    },
    setTrip: (state: TripState, action: { payload: Trip }) => {
      state.trips.push(action.payload);
    },
    setJobs: (state: TripState, action: { payload: Trip[] }) => {
      state.jobs = action.payload;
    },
    appendJobs: (state: TripState, action: { payload: Trip[] }) => {
      state.jobs.push(...action.payload);
    },
    setPaginatedJobs: (state: TripState, action: { payload: Trip[] }) => {
      state.jobs.push(...action.payload);
    },
    updateTripInState: (state: TripState, action: { payload: Trip }) => {
      const index = state.trips.findIndex(
        ({ _id }) => _id === action.payload._id,
      );

      state.trips[index] = action.payload;
    },
  },
});

export const {
  setTrips,
  appendTrips,
  setJobs,
  appendJobs,
  updateTripInState,
  setTrip,
} = TripsSlice.actions;
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
      dispatch(setTrip(data));
      return data;
    });
  };
}

export function assignTrip(trip: AssignTripFormData) {
  return (dispatch: AppDispatch) => {
    return Api.assignTrip(trip).then((trip) => {
      dispatch(updateTripInState(trip));
      return trip;
    });
  };
}

export function updateTrip(trip: Partial<Trip>) {
  return (dispatch: AppDispatch) => {
    return Api.updateTrip(trip).then((trip) => {
      dispatch(updateTripInState(trip));
      return trip;
    });
  };
}

export function updateTripStatus(tripId: string, status: Trip['status']) {
  return (dispatch: AppDispatch) => {
    return Api.updateTripStatus(tripId, status).then((trip) => {
      dispatch(updateTripInState(trip));
      return trip;
    });
  };
}

export function getTrips(params: {
  page: number;
  limit: number;
  status?: string | null;
}) {
  return (dispatch: AppDispatch) => {
    return Api.getTrips(params).then((data) => {
      if (data.currentPage === 1) dispatch(setTrips(data.data));
      else dispatch(appendTrips(data.data));

      return data;
    });
  };
}

export function getJobs(params: {
  page?: number;
  limit?: number;
  senderType?: string;
}) {
  return async (dispatch: AppDispatch) => {
    const request = await Api.getJobs(params).then((data) => {
      if (data.currentPage === 1) {
        dispatch(setJobs(data.data));
      } else {
        dispatch(appendJobs(data.data));
      }

      return data;
    });

    return request;
  };
}

export function uploadTDO(formData: FormData, tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.uploadTDO(formData, tripId).then((trip) => {
      dispatch(updateTripInState(trip));
      return trip;
    });
  };
}

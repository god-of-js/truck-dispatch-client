import { createSelector, createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import GetHelpData from 'types/GetHelpData';
import { AppDispatch, AppState, RootState } from '.';
import Api from 'Api';
import NewTrip from 'types/NewTrip';
import AssignTripFormData from 'types/AssignTripFormData';
import { setUser } from './Account';

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
      const index = state.trips.findIndex(
        ({ _id }) => _id === action.payload._id,
      );

      if (index === -1) state.trips.unshift(action.payload);
      else state.trips[index] = action.payload;
    },
    removeTrip: (state: TripState, action: { payload: string }) => {
      const index = state.trips.findIndex(({ _id }) => _id === action.payload);
      if (index !== -1) state.trips.splice(index, 1);
    },
    setJob: (state: TripState, action: { payload: Trip }) => {
      const index = state.jobs.findIndex(
        ({ _id }) => _id === action.payload._id,
      );

      if (index === -1) state.jobs.push(action.payload);
      else state.jobs[index] = action.payload;
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
  },
});

export const {
  setTrips,
  removeTrip,
  appendTrips,
  setJobs,
  appendJobs,
  setTrip,
  setJob,
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
  return (dispatch: AppDispatch) => {
    return Api.createTrip(trip).then((data) => {
      dispatch(setTrip(data));
      return data;
    });
  };
}

export function assignTrip(trip: AssignTripFormData) {
  return (dispatch: AppDispatch) => {
    return Api.assignTrip(trip).then((data) => {
      dispatch(setTrip(data.trip));
      dispatch(setUser(data.user));
      return data.trip;
    });
  };
}

export function updateTrip(trip: Partial<Trip>) {
  return (dispatch: AppDispatch) => {
    return Api.updateTrip(trip).then((trip) => {
      dispatch(setTrip(trip));
      return trip;
    });
  };
}

export function updateTripStatus(tripId: string, status: Trip['status']) {
  return (dispatch: AppDispatch) => {
    return Api.updateTripStatus(tripId, status).then((trip) => {
      dispatch(setTrip(trip));
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

export function getTrip(tripId: string) {
  return async (dispatch: AppDispatch) => {
    return Api.getTrip(tripId).then((trip) => {
      dispatch(setTrip(trip));
      return trip;
    });
  };
}

export function getJob(jobId: string) {
  return async (dispatch: AppDispatch) => {
    return Api.getJob(jobId).then((job) => {
      dispatch(setJob(job));
      return job;
    });
  };
}

export function uploadTDO(formData: FormData, tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.uploadTDO(formData, tripId).then((trip) => {
      dispatch(setTrip(trip));
      return trip;
    });
  };
}

export function unassignTrip(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.unassignTrip(tripId).then((data) => {
      dispatch(setTrip(data.trip));
      dispatch(setUser(data.user));
      return data;
    });
  };
}

export function cancelTripByTripCreator(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.cancelTripByTripCreator(tripId).then((user) => {
      dispatch(removeTrip(tripId));
      if (user) dispatch(setUser(user));
      return user;
    });
  };
}

export function cancelTripByTransporter(tripId: string) {
  return (dispatch: AppDispatch) => {
    return Api.cancelTripByTransporter(tripId).then((data) => {
      dispatch(removeTrip(data.trip._id));
      return data;
    });
  };
}

export function requestPaymentByTransporter(data: FormData, tripId: string) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.requestPaymentByTransporter(data, tripId).then((trip) => {
      dispatch(setTrip(trip));
    });
  };
}

export function updatePaymentRequestByTransporter(
  data: FormData,
  tripId: string,
  paymentRequestId: string,
) {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.updatePaymentRequest(data, tripId, paymentRequestId).then(
      (trip) => {
        dispatch(setTrip(trip));
      },
    );
  };
}

export function rejectPaymentRequest(
  tripId: string,
  paymentRequestId: string,
  data: { reasonForReject: string },
) {
  return (dispatch: AppDispatch) => {
    return Api.rejectPaymentRequest(tripId, paymentRequestId, data).then(
      (trip) => {
        dispatch(setTrip(trip));
      },
    );
  };
}
export function approvePaymentRequest(
  tripId: string,
  paymentRequestId: string,
) {
  return (dispatch: AppDispatch) => {
    return Api.approvePaymentRequest(tripId, paymentRequestId).then(
      ({ trip, user }) => {
        dispatch(setTrip(trip));
        dispatch(setUser(user));
      },
    );
  };
}

export function sendGethelpMessage(data: GetHelpData) {
  return () => {
    return Api.sendGetHelpessage(data);
  };
}

import { createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import { AppDispatch, AppState, RootState } from '.';
import Api from 'Api';
import { toAnyAction } from 'utils/helpers';

export interface TripState {
  trips: Trip[];
  transporterJobs: Trip[]
}
const initialState: TripState = {
  trips: [],
  transporterJobs: []
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
  },
});

export const { setTrips, setTransporterJobs } = TripsSlice.actions;

export default TripsSlice.reducer;

export function createOrUpdateTrip(data: Trip) {
  return () => {
    return Api.createOrUpdateTrip(data);
  };
}

export function getAgentTrips(agentId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getAgentTrips(agentId).then((data) => dispatch(toAnyAction(setTrips(data))));
  };
}

export function getTransporterTrips(transporterId: string) {
  return (dispatch: AppDispatch) => {
    return Api.getTransporterTrips(transporterId).then((data) => dispatch(toAnyAction(setTrips(data))));
  };
}

export function getTransporterJobs() {
  return (dispatch: AppDispatch) => {
    return Api.getTransporterJobs().then((data) => dispatch(toAnyAction(setTrips(data))));
  };
}

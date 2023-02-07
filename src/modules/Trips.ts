import { createSlice } from '@reduxjs/toolkit';
import Trip from 'types/Trip';
import { AppDispatch, AppState } from '.';
import Api from 'Api';

export interface TripState {
  trips: Trip[];
}
const initialState: TripState = {
  trips: [],
};
export const TripsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setTrips: (state: TripState, action: { payload: Trip[] }) => {
      state.trips = action.payload;
    },
  },
});

export const { setTrips } = TripsSlice.actions;

export default TripsSlice.reducer;

export function createOrUpdateTrip(data: Trip) {
  return () => {
    return Api.createOrUpdateTrip(data);
  };
}

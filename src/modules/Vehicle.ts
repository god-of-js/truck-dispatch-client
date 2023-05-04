import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import { AppDispatch, AppState, RootState } from '.';

export interface VehicleState {
  vehicles: any[];
}
const initialState: VehicleState = {
  vehicles: [],
};
export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles(state: VehicleState, action: { payload: [] }) {
      state.vehicles = action.payload;
    },
    setVehicle(
      state: VehicleState,
      //   Replace with Vehicle type
      action: { payload: any },
    ) {
      state.vehicles.push(action.payload);
    },
  },
});

export const { setVehicles, setVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;

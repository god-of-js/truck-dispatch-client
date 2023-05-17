import { createSelector, createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Vehicle from 'types/Vehicle';
import { AppDispatch, AppState, RootState } from '.';

export interface VehicleState {
  vehicles: Vehicle[];
}
const initialState: VehicleState = {
  vehicles: [],
};
export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles(state: VehicleState, action: { payload: Vehicle[] }) {
      state.vehicles = action.payload;
    },
    setVehicle(state: VehicleState, action: { payload: Vehicle }) {
      const vehicleIndex = state.vehicles.findIndex(
        ({ _id }) => _id === action.payload._id,
      );
      if (vehicleIndex === -1) {
        state.vehicles.push(action.payload);
        return;
      }

      state.vehicles[vehicleIndex] = action.payload;
    },
  },
});

export const { setVehicles, setVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;

export const createVehicle = (vehicle: FormData) => {
  return (dispatch: AppDispatch) => {
    return Api.createVehicle(vehicle).then((data) => {
      dispatch(setVehicle(data));
    });
  };
};

export const getVehicles = () => {
  return (dispatch: AppDispatch) => {
    return Api.getVehicles().then((data) => {
      dispatch(setVehicles(data));
    });
  };
};

export const updateVehicle = (vehicleData: FormData, vehicleId: string) => {
  return (dispatch: AppDispatch) => {
    return Api.updateVehicle(vehicleData, vehicleId).then((data) => {
      dispatch(setVehicle(data));
    });
  };
};

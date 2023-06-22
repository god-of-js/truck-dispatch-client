import { createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Vehicle from 'types/Vehicle';
import { AppDispatch } from '.';

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
    appendVehicles: (state: VehicleState, action: { payload: Vehicle[] }) => {
      state.vehicles.push(...action.payload);
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
    removeVehicle(state: VehicleState, action: { payload: string }) {
      state.vehicles = state.vehicles.filter(
        ({ _id }) => _id !== action.payload,
      );
    },
  },
});

export const { setVehicles, appendVehicles, setVehicle, removeVehicle } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;

export const createVehicle = (vehicle: FormData) => {
  return (dispatch: AppDispatch) => {
    return Api.createVehicle(vehicle).then((data) => {
      dispatch(setVehicle(data));
    });
  };
};

export function getVehicles(params: { page: number; limit: number }) {
  return (dispatch: AppDispatch) => {
    return Api.getVehicles(params).then((data) => {
      if (data.currentPage === 1) dispatch(setVehicles(data.data));
      else dispatch(appendVehicles(data.data));

      return data;
    });
  };
}

export const getVehicle = () => {
  return (dispatch: AppDispatch) => {
    return Api.getVehicle().then((data) => {
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

export const deleteVehicle = (vehicleId: string) => {
  return (dispatch: AppDispatch) => {
    return Api.deleteVehicle(vehicleId).then(() => {
      dispatch(removeVehicle(vehicleId));
    });
  };
};

import { createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Rating from 'types/Rating';
import { AppDispatch, AppState } from '.';

export interface RatingsState {
  ratings: Rating[];
}
const initialState: RatingsState = {
  ratings: [] as Rating[],
};
export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRatings: (state: RatingsState, action: { payload: Rating[] }) => {
      state.ratings = action.payload;
    },
  },
});
export const { setRatings } = ratingsSlice.actions;

export default ratingsSlice.reducer;

export const getTripRating = (tripId: string) => {
  return (dispatch: AppDispatch) => {
    return Api.getRating(tripId);
  };
};

export const publishUserRating = (data: Rating) => {
  return () => {
    return Api.publishUserRating(data);
  };
};

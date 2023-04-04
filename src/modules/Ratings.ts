import { createSlice } from '@reduxjs/toolkit';
import Api from 'Api';
import Rating from 'types/Rating';
import { toAnyAction } from 'utils/helpers';
import { AppDispatch, AppState } from '.';
import { createOrUpdateUser } from './Account';

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
  return () => {
    return Api.getRatings(tripId, 'tripId');
  };
};

export const compileUserRating = (userId: string) => {
  return async (dispatch: AppDispatch, state: AppState) => {
    const user = state().account.users.find(({ _id }) => _id === userId);
    if (!user) throw new Error('404: User not found.');

    const userRatings = await Api.getRatings(userId);
    const ratings = userRatings.map(({ rating }) => rating);

    if (!ratings.length) return;

    const sumOfRatings = ratings.reduce((a, b) => a + b, 0);
    const newRating = (sumOfRatings / ratings.length).toFixed(1);

    return dispatch(
      toAnyAction(
        createOrUpdateUser({
          ...user,
          rating: parseInt(newRating),
        }),
      ),
    );
  };
};

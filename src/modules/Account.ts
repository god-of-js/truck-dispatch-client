import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '.';
import Api from '../Api';
import User from '../types/User';
import UserWithPassword from '../types/UserWithPassword';

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state: AccountState, action: { payload: User }) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = accountSlice.actions;

export default accountSlice.reducer;

export function RegisterUser(user: UserWithPassword) {
  return () => {
    return Api.createUserWithEmailAndPassword(user.email, user.password!).then(
      (data) => {
        user.id = data.uid;

        delete user.password;
        delete user.cPassword;
        localStorage.setItem('uid', user.id)

        return Api.recordAccountDetails({
          ...user,
        });
      },
    );
  };
}

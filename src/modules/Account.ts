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

export function RegisterUser(AuthUser: UserWithPassword) {
  return () => {
    return Api.createUserWithEmailAndPassword(
      AuthUser.email,
      AuthUser.password!,
    )
      .then((data) => {
        const user = {} as User;
        Object.keys(AuthUser)
          .filter((key) => key !== 'password' && key !== 'cPassword')
          .forEach((key: string) => {
            user[key as keyof User] = AuthUser[key as keyof User];
          });
        user.id = data.uid;

        localStorage.setItem('uid', user.id);

        return Api.recordAccountDetails({
          ...user,
        })
      },
    ).catch((err) => {
      throw new Error(err.message);
    });
  };
}

export function loginUser(AuthUser: { email: string; password: string }) {
  return () => {
    return Api.signInWithEmailAndPassword(AuthUser.email, AuthUser.password!)
      .then((data) => {
        console.log(data)
        localStorage.setItem('uid', data.uid);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

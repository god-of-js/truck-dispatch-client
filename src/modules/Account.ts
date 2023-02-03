import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '.';
import Api from 'Api';
import User from '../types/User';
import UserWithPassword from '../types/UserWithPassword';
import VerificationFormData from '../types/VerificationFormData';

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
        const user: Record<string, string | boolean | undefined> = {};
        Object.keys(AuthUser)
          .filter((key) => key !== 'password' && key !== 'cPassword')
          .forEach((key: string) => {
            const value = AuthUser[key as keyof User];
            if (key === 'isVerified' && AuthUser.userType === 'agent') return;
            user[key] = value;
          });
        user.id = data.uid;
        const typedUser = user as unknown as User;

        localStorage.setItem('uid', typedUser.id);
        createOrUpdateUser(typedUser);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

export function createOrUpdateUser(user: User) {
  return Api.recordAccountDetails(user);
}
export function loginUser(AuthUser: { email: string; password: string }) {
  return () => {
    return Api.signInWithEmailAndPassword(AuthUser.email, AuthUser.password!)
      .then((data) => {
        localStorage.setItem('uid', data.uid);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

export function getUser() {
  return (dispatch: AppDispatch) => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('400: User is not authenticated');
    return Api.getUser(uid)
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

// TODO: add middlewares to check if user is a transporter or admin before triggering certain actions.
// https://medium.com/netscape/creating-custom-middleware-in-react-redux-961570459ecb#:~:text=To%20apply%20a%20middleware%20in,when%20an%20action%20is%20dispatched.
export const  sendVerificationDetailsToAdmin =  (
  verificationData: VerificationFormData,
) => {
  // TODO: Ask ben: redux error ﻿ Actions must be plain objects. Use custom middleware for async actions.
  return async (dispatch: AppDispatch, state: AppState) => {
    const userId = state().account.user?.id;
    if (!userId) throw new Error('user is not authenticated');
    await Api.sendVerificationDetailsToAdmin(userId, verificationData).then(() => {
      dispatch({
        type: 'sendVerificationDetailsToAdmin'
      })
    });
    return;
  };
}

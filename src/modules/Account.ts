import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState, RootState } from '.';
import Api from 'Api';
import User from '../types/User';
import UserWithPassword from '../types/UserWithPassword';
import VerificationFormData from '../types/VerificationFormData';
import { removeKeyValuePairsFromObject, toAnyAction } from 'utils/helpers';
import Rating from 'types/Rating';

export interface AccountState {
  users: User[];
}
const initialState: AccountState = {
  users: [] as User[],
};
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUsers: (state: AccountState, action: { payload: User[] }) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = accountSlice.actions;

export default accountSlice.reducer;

const users = (state: RootState) => state.account.users;
export const selectUser = (userId: string) =>
  createSelector(users, (usersArr) =>
    usersArr.find((user) => user.id === userId),
  );
export const selectDashboardUser = createSelector(
  users,
  (usersArr): User | null => {
    const userId = localStorage.getItem('uid');
    if (!userId) return null;
    const user = usersArr.find((user) => user.id === userId);
    return user || null;
  },
);

export const selectTransporters = createSelector(users, (usersArr: User[]) =>
  usersArr.filter(({ userType }) => userType === 'transporter'),
);
export const selectTransporter = (transporterId: string) =>
  createSelector(users, (usersArr: User[]) =>
    usersArr.find(({ id }) => id === transporterId),
  );
export const selectAgents = createSelector(users, (usersArr: User[]) =>
  usersArr.filter(({ userType }) => userType === 'agent'),
);

export function RegisterUser(AuthUser: UserWithPassword) {
  return async (dispatch: AppDispatch) => {
    await Api.createUserWithEmailAndPassword(
      AuthUser.email,
      AuthUser.password!,
    ).then((data) => {
      const user = removeKeyValuePairsFromObject<User>(AuthUser, [
        'password',
        'cPassword',
        AuthUser.userType !== 'agent' ? '' : 'status',
      ]);
      user.id = data.uid;

      localStorage.setItem('uid', user.id);
      dispatch(toAnyAction(createOrUpdateUser(user)));
    });
  };
}

export function createOrUpdateUser(user: User) {
  return async (dispatch: AppDispatch) => {
    return Api.recordAccountDetails(user);
  };
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

export function getUsers() {
  return (dispatch: AppDispatch) => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('400: User is not authenticated');
    return Api.getUsers()
      .then((data) => {
        dispatch(setUsers(data));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

export const sendVerificationDetailsToAdmin = (
  verificationData: VerificationFormData,
) => {
  return (dispatch: AppDispatch, state: AppState) => {
    const userId = localStorage.getItem('uid');
    if (!userId) throw new Error('user is not authenticated');
    return Api.sendVerificationDetailsToAdmin(userId, verificationData);
  };
};

export const publishUserRating = (data: Rating) => {
  return () => {
    return Api.publishUserRating(data);
  };
};

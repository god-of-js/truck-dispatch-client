import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState, RootState } from '.';
import { removeKeyValuePairsFromObject, toAnyAction } from 'utils/helpers';
import Api from 'Api';
import User from '../types/User';
import UserWithPassword from '../types/UserWithPassword';
import Verification from '../types/Verification';
import Rating from 'types/Rating';
import BankAccount from 'types/BankAccount';

export interface AccountState {
  users: User[];
  verification: Verification | null;
  user: User | null;
  bankAccountDetails: BankAccount | null;
}

const initialState: AccountState = {
  users: [] as User[],
  user: null,
  verification: null,
  bankAccountDetails: null,
};
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state: AccountState, action: { payload: User }) => {
      state.user = action.payload;
    },
    setUsers: (state: AccountState, action: { payload: User[] }) => {
      state.users = action.payload;
    },
    setVerification: (
      state: AccountState,
      action: { payload: Verification },
    ) => {
      state.verification = action.payload;
    },
    setBankAccountDetails: (
      state: AccountState,
      action: { payload: BankAccount },
    ) => {
      state.bankAccountDetails = action.payload;
    },
  },
});

export const { setUsers, setUser, setVerification, setBankAccountDetails } =
  accountSlice.actions;

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
export function getDashboardUser() {
  return (dispatch: AppDispatch) => {
    const uid = localStorage.getItem('uid');
    if (!uid) return;
    return Api.getUser(uid)
      .then((data) => {
        dispatch(setUser(data));
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

export const sendVerificationDetailsToAdmin = (
  verificationData: Verification,
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

export const getUserVerification = () => {
  return (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('uid');
    if (!userId) throw new Error('user is not authenticated');
    return Api.getVerificationByUserId(userId).then((data) => {
      dispatch(setVerification(data));
    });
  };
};

export const saveUserAccount = (accountDetails: BankAccount) => {
  return (dispatch: AppDispatch) => {
    return Api.saveAccountNumber(accountDetails).then(() => {
      dispatch(setBankAccountDetails(accountDetails));
    });
  };
};

export const getUserAccountNumber = (uid = localStorage.getItem('uid')) => {
  return (dispatch: AppDispatch) => {
    if (!uid) throw new Error('No user id was provided');
    return Api.getAccountNumber(uid).then((data) => {
      dispatch(setBankAccountDetails(data));
      return data;
    });
  };
};

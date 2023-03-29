import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState, RootState } from '.';
import Api from 'Api';
import User from '../types/User';
import UserWithPassword from '../types/UserWithPassword';
import Verification from '../types/Verification';
import Rating from 'types/Rating';
import BankAccount from 'types/BankAccount';
import { saveTokenVerificationInfo } from 'utils/helpers';
import { saveUserSessionId } from 'utils/userSession';

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
    usersArr.find((user) => user._id === userId),
  );

export const selectTransporters = createSelector(users, (usersArr: User[]) =>
  usersArr.filter(({ userType }) => userType === 'transporter'),
);

export const selectTransporter = (transporterId: string) =>
  createSelector(users, (usersArr: User[]) =>
    usersArr.find(({ _id }) => _id === transporterId),
  );

export const selectAgents = createSelector(users, (usersArr: User[]) =>
  usersArr.filter(({ userType }) => userType === 'agent'),
);

export function RegisterUser(AuthUser: UserWithPassword) {
  return async () => {
    await Api.createUser(AuthUser).then((data) => {
      saveTokenVerificationInfo(data);
    });
  };
}

export function sendOTP(phone: string) {
  return () => {
    return Api.requestVerificationCode({ phone }).then((data) => {
      saveTokenVerificationInfo(data);
    });
  };
}
export function VerifyOtp(pin: string) {
  return async () => {
    const otpPinId = localStorage.getItem('otp-pin-id');
    const otpPhone = localStorage.getItem('otp-phone-number');

    if (!otpPinId || !otpPhone)
      throw new Error(
        'Something went wrong. Kindly request a new OTP for verification',
      );

    const data = {
      pin,
      pin_id: otpPinId,
      phone: otpPhone,
    };
    return Api.verifyPhone(data)
      .then(() => {
        localStorage.removeItem('otp-pin-id');
        localStorage.removeItem('otp-phone-number');
      })
      .catch((err) => Promise.reject(err.data));
  };
}

export function createOrUpdateUser(user: User) {
  return async () => {
    return Api.recordAccountDetails(user);
  };
}

export function loginUser(AuthUser: { email: string; password: string }) {
  return () => {
    return Api.signInWithEmailAndPassword(AuthUser)
      .then((data) => {
        saveUserSessionId(data.jwt);
      })
      .catch((err) => {
        if (err.message === 'Phone has not been verified') {
          saveTokenVerificationInfo(err.data);
        }
        return Promise.reject(err);
      });
  };
}

export function getUsers() {
  return (dispatch: AppDispatch) => {
    const uid = localStorage.getItem('uid');
    // Log user out in this situation
    if (!uid) return;
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
    return Api.getUser()
      .then((data) => {
        dispatch(setUser(data));
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
}

export const sendVerificationDetailsToAdmin = (verificationData: FormData) => {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.sendVerificationDetailsToAdmin(verificationData);
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

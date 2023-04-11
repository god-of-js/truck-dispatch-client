import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '.';
import Api from 'Api';
import User from '../types/User';
import UserWithPassword from '../types/UserWithPassword';
import Verification from '../types/Verification';
import BankAccount from 'types/BankDetails';
import { saveTokenVerificationInfo } from 'utils/helpers';
import { saveUserSessionId } from 'utils/userSession';

export interface AccountState {
  verification: Verification | null;
  user: User | null;
}

const initialState: AccountState = {
  user: null,
  verification: null,
};
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state: AccountState, action: { payload: User }) => {
      state.user = action.payload;
    },
    setVerification: (
      state: AccountState,
      action: { payload: Verification },
    ) => {
      state.verification = action.payload;
    },
  },
});

export const { setUser, setVerification } = accountSlice.actions;

export default accountSlice.reducer;

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
export function VerifyEmail(token: string) {
  return async () => {
    return Api.verifyEmail({
      token,
    });
  };
}

export function updateUser(data: FormData) {
  return async (dispatch: AppDispatch) => {
    return Api.updateUser(data).then((user) => dispatch(setUser(user)));
  };
}

export function loginUser(AuthUser: { email: string; password: string }) {
  return () => {
    return Api.signInWithEmailAndPassword(AuthUser)
      .then(({ jwt }) => {
        saveUserSessionId(jwt);
      })
      .catch((err) => {
        if (err.message === 'Phone has not been verified') {
          saveTokenVerificationInfo(err.data);
        }
        return Promise.reject(err);
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

export const startVerificationProcess = (verificationData: FormData) => {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.startVerificationProcess(verificationData);
  };
};

export const updateVerification = (verificationData: FormData) => {
  return (dispatch: AppDispatch, state: AppState) => {
    return Api.updateVerification(verificationData);
  };
};

export const getUserVerification = () => {
  return (dispatch: AppDispatch) => {
    return Api.getVerificationByUserId().then((data) => {
      dispatch(setVerification(data));
    });
  };
};

export const createUserBankAccount = (accountDetails: BankAccount) => {
  return (dispatch: AppDispatch) => {
    return Api.saveAccountNumber(accountDetails).then((user) => {
      dispatch(setUser(user));
    });
  };
};
export const updateUserBankAccount = (accountDetails: BankAccount) => {
  return (dispatch: AppDispatch) => {
    return Api.updateAccountNumber(accountDetails).then((user) => {
      dispatch(setUser(user));
    });
  };
};

export const requestEmailVerification = () => {
  return () => {
    return Api.requestEmailVerification();
  };
};

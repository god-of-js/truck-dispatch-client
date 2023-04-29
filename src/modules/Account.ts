import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import Api from 'Api';
import User from '../types/User';
import BankAccount from 'types/BankDetails';
import { saveTokenVerificationInfo } from 'utils/helpers';
import { saveAuthSessionId, saveUserSessionId } from 'utils/userSession';

export interface AccountState {
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

export function registerUser(AuthUser: Partial<User>) {
  return async () => {
    await Api.createUser(AuthUser).then((data) => {
      saveTokenVerificationInfo(data.smsData);
      saveAuthSessionId(data.token);
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
export function verifyOtp(pin: string) {
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
export function verifyEmail(token: string) {
  return () => {
    return Api.verifyEmail({
      token,
    })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };
}

export function updateUser(data: FormData) {
  return (dispatch: AppDispatch) => {
    return Api.updateUser(data).then((user) => dispatch(setUser(user)));
  };
}
export function updatePassword(data: { password: string }) {
  return () => {
    return Api.updatePassword(data);
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

export function requestForgotPasswordLink(AuthUser: { email: string }) {
  return () => {
    return Api.requestResetPasswordLink(AuthUser);
  };
}

export function getDashboardUser() {
  return (dispatch: AppDispatch) => {
    return Api.getUser().then((data) => {
      dispatch(setUser(data));
      return data;
    });
  };
}

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

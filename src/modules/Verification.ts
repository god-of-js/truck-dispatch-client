import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import Api from 'Api';
import Verification from '../types/Verification';

export interface VerificationState {
  verification: Verification | null;
}

const initialState: VerificationState = {
  verification: null,
};
export const accountSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setVerification: (
      state: VerificationState,
      action: { payload: Verification },
    ) => {
      state.verification = action.payload;
    },
  },
});

export const { setVerification } = accountSlice.actions;

export default accountSlice.reducer;

export const startVerificationProcess = (verificationData: FormData) => {
  return () => {
    return Api.startVerificationProcess(verificationData).then((verification) => {
      setVerification(verification);
    });
  };
};

export const updateVerification = (verificationData: FormData) => {
  return () => {
    return Api.updateVerification(verificationData);
  };
};

export const sendCompanyUpgradeVerification = (verificationData: FormData) => {
  return () => {
    return Api.startCompanyUpgradeVerificationProcess(verificationData);
  };
};

export const getUserVerification = () => {
  return (dispatch: AppDispatch) => {
    return Api.getVerificationByUserId().then((data) => {
      dispatch(setVerification(data));
      return data;
    });
  };
};

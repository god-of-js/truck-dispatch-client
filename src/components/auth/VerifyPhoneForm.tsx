import React, { useState, useEffect, useRef, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { toAnyAction } from 'utils/helpers';
import { sendOTP, verifyOtp } from 'modules/Account';
import { Toast } from 'utils/toast';
import VerifyPhoneSchema from 'utils/validations/VerifyPhoneSchema';

const UiIcon = lazy(() => import('ui/UiIcon'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiForm = lazy(() => import('ui/UiForm'));
interface Props {
  goToNext: () => void;
}

export default function VerifyPhoneForm({ goToNext }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    pin: '',
  });
  const [canResendCode, setCanResendCode] = useState(false);
  const [count, setCount] = useState(59);
  const [loading, setLoading] = useState(false);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const fornmattedCount = count < 10 ? `0${count}` : `${count}`;

  function setPin({ value }: { name: string; value: string | null }) {
    setFormData({ pin: value! });
  }

  function verifyPhoneNumber() {
    try {
      setLoading(true);
      dispatch(toAnyAction(verifyOtp(formData.pin)))
        .then(() => {
          goToNext();
        })
        .catch((err: Error) => {
          if (
            err.message ===
            'Something went wrong. Kindly request a new OTP for verification'
          ) {
            Toast.error({
              msg: 'Something went wrong, kindly log in to continue the process.',
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function requestNewCode(e: any) {
    e.preventDefault();
    setCanResendCode(false);
    setCount(59);
    const otpPhoneNumber = localStorage.getItem('otp-phone-number');
    if (!otpPhoneNumber) {
      navigate('/auth/login');
      Toast.error({ msg: 'Kindly login to get a verification code.' });
      return;
    }
    setSendOTPLoading(true);
    dispatch(toAnyAction(sendOTP(otpPhoneNumber))).finally(() => {
      setSendOTPLoading(false);
    });
  }

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      setCount((prevState) => prevState - 1);
    }, 1000);

    if (count === 0) {
      clearTimeout(countdownTimer);
      setCanResendCode(true);
    }

    return () => {
      clearTimeout(countdownTimer);
    };
  }, [count]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="form-container">
      <header className="center-items">
        <UiIcon icon="CallReceived" size="45" />
        <h1>Verify Phone Number</h1>
        <p>
          Enter the OTP (One Time Pin) that was sent to the phone number you
          provided
        </p>
      </header>
      <UiForm
        formData={formData}
        schema={VerifyPhoneSchema}
        onSubmit={verifyPhoneNumber}
      >
        {({ errors }) => (
          <>
            <UiInput
              label="Enter OTP"
              type="text"
              inputRef={inputRef}
              value={formData.pin}
              error={errors.pin}
              name="OTP"
              onChange={setPin}
            />
            <StyledResendCode className="no-btn-margin-top">
              <p>Didn’t get the code?</p>
              <UiButton
                size="s"
                variant="secondary"
                loading={sendOTPLoading}
                disabled={!canResendCode}
                onClick={requestNewCode}
              >
                {canResendCode ? `Resend` : `Resend in 00:${fornmattedCount}`}
              </UiButton>
            </StyledResendCode>
            <UiButton
              loading={loading}
              size="large"
              variant="primary"
              isFullWidth
            >
              Continue
            </UiButton>
          </>
        )}
      </UiForm>
    </div>
  );
}

const StyledResendCode = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pxToRem(9)};
  align-items: center;
  padding-top: ${pxToRem(26)};
  p {
    font-weight: 400;
    color: var(--color-gray-80);
    font-family: 'thiccboi-regular';
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(24)};
  }
  button {
    border-radius: ${pxToRem(16)};
  }
`;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import StyledAuthContent from './StyledAuthContent';
import { toAnyAction } from 'utils/helpers';
import { sendOTP, VerifyOtp } from 'modules/Account';
import { Toast } from 'utils/toast';
import VerifyPhoneSchema from 'utils/validations/VerifyPhoneSchema';

interface Props {
  goToNext: () => void;
}

export default function VerifyPhoneForm({ goToNext }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pin: '',
  });
  const [canResendCode, setCanResendCode] = useState(false);
  const [count, setCount] = useState(59);
  const [loading, setLoading] = useState(false);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);

  function setPin({ value }: { name: string; value: string | null }) {
    setFormData({ pin: value! });
  }

  function verifyPhoneNumber() {
    try {
      setLoading(true);
      dispatch(toAnyAction(VerifyOtp(formData.pin)))
        .then(() => {
          Toast.success({ msg: 'Phone number verification was successful' });
          navigate('/auth/login');
        })
        .catch((err: Error) => {
          console.log(err.message);
          if (
            err.message ===
            'Something went wrong. Kindly request a new OTP for verification'
          ) {
            navigate('/auth/verify-phone/request-code');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function requestNewCode() {
    setCanResendCode(false);
    setCount(59);
    const otpPhoneNumber = localStorage.getItem('otp-phone-number');
    if (!otpPhoneNumber) {
      navigate('/auth/verify-phone/request-code');
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

  const fornmattedCount = count < 10 ? `0${count}` : `${count}`;

  return (
    <StyledAuthContent>
      <div className="form-container">
        <header>
          <UiIcon icon="CallReceived" size="45" />
          <h1>Verify Phone Number</h1>
          <p>
            Enter the OTP (One Time Pin) that was sent to the phone number you
            provided
          </p>
        </header>
        <UiForm formData={formData} onSubmit={verifyPhoneNumber}>
          {({ errors }) => (
            <>
              <UiInput
                label="Enter OTP"
                type="text"
                value={formData.pin}
                name="OTP"
                onChange={setPin}
              />
              <StyledResendCode>
                <p>Didn’t get the code?</p>
                <UiButton
                  size="s"
                  variant="secondary"
                  disabled={!canResendCode}
                  onClick={requestNewCode}
                >
                  {canResendCode ? `Resend` : `Resend in 00:${fornmattedCount}`}
                </UiButton>
              </StyledResendCode>
              <UiButton size="large" variant="primary" isFullWidth>
                Continue
              </UiButton>
            </>
          )}
        </UiForm>
      </div>
    </StyledAuthContent>
  );
}

const StyledResendCode = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pxToRem(9)};
  align-items: center;
  margin-top: ${pxToRem(26)};
  p {
    font-weight: 400;
    color: var(--color-gray-80);
    font-family: 'thiccboi-regular';
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(24)};
  }
  button {
    margin: 0 !important;
    border-radius: ${pxToRem(16)};
  }
`;

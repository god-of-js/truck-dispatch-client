import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import StyledAuthContent from './StyledAuthContent';

export default function VerifyPhoneForm() {
  const [formData, setFormData] = useState({
    OTP: '',
  });
  const [canResendCode, setCanResendCode] = useState(false);
  const [count, setCount] = useState(59);

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

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }
  function onSubmit() {}
  function resendCode() {
    setCanResendCode(false);
    setCount(59);
  }

  return (
    <StyledAuthContent>
      <div className="header-container">
        <UiIcon icon="CallReceived" size="45" />
        <h1>Verify Phone Number</h1>
        <p>
          Enter the OTP (One Time Pin) that was sent to the phone number you
          provided
        </p>
      </div>
      <div className="form-container">
        <UiForm formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <>
              <UiInput
                label="Enter OTP"
                type="text"
                value={formData.OTP}
                name="OTP"
                onChange={handleChange}
              />
              <StyledResendCode>
                <p>Didn’t get the code?</p>
                <UiButton
                  size="s"
                  variant="secondary"
                  disabled={!canResendCode}
                  onClick={resendCode}
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
  /* margin-bottom: ${pxToRem(-24)}; */
  p {
    font-weight: 400;
    color: var(--color-gray-80);
    font-family: 'thiccboi-regular';
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(24)};
  }
  button {
    margin: 0 !important;
  }
`;

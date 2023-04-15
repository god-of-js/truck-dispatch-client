import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import styled from 'styled-components';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: '',
    ConfirmNewPassword: '',
  });

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function handleSubmit() {}
  return (
    <AuthLayoutStyling invert>
      <StyledResetPassword>
        <h1>Reset Password</h1>
        <p>Must be atleast 8 characters</p>
        <div className="form-container">
          <UiForm formData={formData} onSubmit={handleSubmit}>
            {({ errors }) => (
              <>
                <UiInput
                  label="New Password*"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  type="password"
                  name="newPassword"
                  error={errors.email}
                  onChange={handleChange}
                />
                <Margin />
                <UiInput
                  label="Confirm Password*"
                  placeholder="Confirm password"
                  value={formData.ConfirmNewPassword}
                  type="password"
                  name="ConfirmNewPassword"
                  error={errors.email}
                  onChange={handleChange}
                />
                <Margin />
                <UiButton isFullWidth size="large" variant="primary">
                  RESEt PASSWORD
                </UiButton>
              </>
            )}
          </UiForm>
        </div>
        <div className="sign-up">
          <p>
            New to TruckDispatch? <Link to="/auth/join">Sign Up</Link>{' '}
          </p>
        </div>
      </StyledResetPassword>
    </AuthLayoutStyling>
  );
}
const StyledResetPassword = styled.div`
  * {
    margin: 0;
  }

  h1 {
    font-size: ${pxToRem(32)};
    color: var(--color-neutralBlack);
    margin-top: ${pxToRem(40)};
    margin-bottom: ${pxToRem(8)};
    line-height: ${pxToRem(54)};
  }
  & > p {
    margin-bottom: ${pxToRem(32)};
  }
  p {
    font-weight: 400;
    color: var(--color-gray-80);
    font-family: 'thiccboi-regular';
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(24)};
  }
  button {
    margin-top: ${pxToRem(250)};
  }
  .sign-up {
    margin-top: ${pxToRem(36)};
    text-align: center;
    p {
      font-size: ${pxToRem(16)};
    }
  }
  @media (min-width: 900px) {
    .form-container {
      max-width: ${pxToRem(450)};
    }
    h1 {
      font-size: ${pxToRem(48)};
      margin-top: 0;
      margin-bottom: ${pxToRem(16)};
    }
    & > p {
      margin-bottom: ${pxToRem(48)};
    }
    button {
      margin-top: ${pxToRem(48)};
    }
    .sign-up {
      margin-top: ${pxToRem(60)};
      text-align: initial;
    }
  }
`;
const Margin = styled.div`
  margin-bottom: ${pxToRem(24)};
`;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import styled from 'styled-components';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';

import { requestForgotPasswordLink } from '../../modules/Account';

import { toAnyAction } from 'utils/helpers';
import ForgotPasswordSchema from 'utils/validations/ForgotPasswordSchema';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function handleSubmit() {
    setLoading(true);
    dispatch(toAnyAction(requestForgotPasswordLink(formData)))
      .then(() => {
        navigate('/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <AuthLayoutStyling invert>
      <StyledForgotPassword>
        <h1>Forgot password?</h1>
        <p>No worries, we’ll send you reset instructions</p>
        <div className="form-container">
          <UiForm
            formData={formData}
            schema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <>
                <UiInput
                  label="Email Adress*"
                  placeholder="Enter your email adress"
                  value={formData.email}
                  name="email"
                  error={errors.email}
                  onChange={handleChange}
                />
              </>
            )}
          </UiForm>
          <div className="button-flex">
            <UiButton size="large" variant="secondary" isFullWidth>
              <UiIcon icon="ArrowLeft" />
              Back to sign in
            </UiButton>
            <UiButton
              size="large"
              isFullWidth
              onClick={() => navigate('/auth/reset-password')}
            >
              RESET
            </UiButton>
          </div>
        </div>
        <div className="sign-up">
          <p>
            New to TruckDispatch? <Link to="/auth/join">Sign Up</Link>{' '}
          </p>
        </div>
      </StyledForgotPassword>
    </AuthLayoutStyling>
  );
}

const StyledForgotPassword = styled.div`
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
  .button-flex {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(12)};
    margin-top: ${pxToRem(250)};
  }
  .sign-up {
    display: none;
    margin-top: ${pxToRem(100)};
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
    .button-flex {
      flex-direction: row;
      gap: ${pxToRem(9.8)};
      margin-top: ${pxToRem(48)};
    }
    .sign-up {
      display: block;
      margin-top: ${pxToRem(60)};
      text-align: initial;
    }
  }
`;

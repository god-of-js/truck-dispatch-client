import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../modules/Account';

import { Toast } from '../../utils/toast';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import { toAnyAction } from 'utils/helpers';
import loginSchema from 'utils/validations/loginSchema';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import StyledAuthContent from 'components/auth/StyledAuthContent';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    },
  );

  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function handleSubmit() {
    setLoading(true);
    dispatch(toAnyAction(loginUser(formData)))
      .then(() => {
        navigate('/my-trips');
      })
      .catch((err: Error) => {
        let msg = err.message;
        if (msg === 'Phone has not been verified') {
          navigate('/auth/verify-phone');
        }
        Toast.error({ msg });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <AuthLayoutStyling img invert>
      <StyledAuthContent inverted>
        <div className="form-container">
          <header>
            <h1>Welcome back,</h1>
            <p>Sign in to continue to your account</p>
          </header>
          <UiForm
            schema={loginSchema}
            formData={formData}
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
                <UiInput
                  type="password"
                  placeholder="Enter your password"
                  label="Password*"
                  name="password"
                  value={formData.password!}
                  error={errors.password}
                  onChange={handleChange}
                />
                <div className="forgot-password">
                  <p>
                    Forgot Password?{' '}
                    <Link to="/auth/forgot-password">Reset Password</Link>{' '}
                  </p>
                </div>
                <UiButton
                  isFullWidth
                  loading={loading}
                  size="large"
                  variant="primary"
                >
                  Sign In
                </UiButton>
                <div className="sign-up">
                  <p>
                    New to TruckDispatch? <Link to="/auth/join">Sign Up</Link>{' '}
                  </p>
                </div>
              </>
            )}
          </UiForm>
        </div>
      </StyledAuthContent>
    </AuthLayoutStyling>
  );
}

const StyledLogin = styled.div`
  * {
    margin: 0;
  }
  h1 {
    font-size: ${pxToRem(32)};
    color: var(--color-neutralBlack);
    margin-bottom: ${pxToRem(16)};
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
  .forgot-password {
    margin-top: ${pxToRem(100)};
  }
  button {
    margin-top: ${pxToRem(48)};
  }

  .sign-up {
    margin-top: ${pxToRem(36)};
    text-align: center;
  }
  @media (min-width: 900px) {
    .form-container {
      max-width: ${pxToRem(450)};
    }
    h1 {
      font-size: ${pxToRem(48)};
    }
    & > p {
      margin-bottom: ${pxToRem(48)};
    }
    .forgot-password {
      margin-top: ${pxToRem(24)};
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

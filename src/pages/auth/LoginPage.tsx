import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../modules/Account';

import { Toast } from '../../utils/toast';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import { toAnyAction } from 'utils/helpers';
import loginSchema from 'utils/validations/loginSchema';
<<<<<<< HEAD
import UiOverlay from 'ui/UiOverlay';
import NotifyUsersFromFirebase from 'components/auth/NotifyUsersFromFirebase';
=======
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import StyledAuthContent from 'components/auth/StyledAuthContent';
>>>>>>> 6bffce03b64efe0b63b9d439825c504718197bf3

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
  const [isNotifyUsertoResetVisible, setIsNotifyUserToResetVisible] = useState(false)

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
        } else if(msg === 'Login directions have been sent to your email'){
        setIsNotifyUserToResetVisible(true)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
<<<<<<< HEAD
    <Page>
      <UiForm schema={loginSchema} formData={formData} onSubmit={handleSubmit}>
        {({ errors }) => (
          <>
            <Heading>Sign in</Heading>
            <Margin>
              <UiInput
                label="Email*"
                value={formData.email}
                name="email"
                error={errors.email}
                onChange={handleChange}
              />
            </Margin>
            <Margin>
              <UiInput
                type="password"
                label="Password*"
                name="password"
                value={formData.password!}
                error={errors.password}
                onChange={handleChange}
              />
              <ForgotPassword>
                Forgot password?{' '}
                <Link
                  to="/auth/forgot-password"
                  className="forgot-password-link"
                >
                  Reset password
                </Link>
              </ForgotPassword>
            </Margin>
            <UiButton isFullWidth loading={loading}>
              Sign In
            </UiButton>
            <LinkToRegisteration>
              Don't have an account?{' '}
              <Link to="/auth/join/agent">register with us</Link>
            </LinkToRegisteration>
          </>
        )}
      </UiForm>
      <UiOverlay isVisible={isNotifyUsertoResetVisible}>
          <NotifyUsersFromFirebase
            onClose={() => setIsNotifyUserToResetVisible(false)}
          />
        </UiOverlay>
    </Page>
=======
    <AuthLayoutStyling img invert isInvertedForm>
      <StyledAuthContent inverted>
        <div className="form-container">
          <header>
            <h1>Welcome back,</h1>
            <p className="info-text">Sign in to continue to your account</p>
          </header>
          <UiForm
            schema={loginSchema}
            formData={formData}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <div className="form-container__inner">
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
                <p>
                  Forgot Password?{' '}
                  <Link to="/auth/forgot-password">Reset Password</Link>{' '}
                </p>
                <div className="hidden-in-mobile">
                  <UiButton
                    isFullWidth
                    loading={loading}
                    size="large"
                    variant="primary"
                  >
                    Sign In
                  </UiButton>
                </div>

                <div className="bottom-actions">
                  <div className="visible-in-mobile">
                    <UiButton
                      isFullWidth
                      loading={loading}
                      size="large"
                      variant="primary"
                    >
                      Sign In
                    </UiButton>
                  </div>
                  <p>
                    <span>New to TruckDispatch?</span>{' '}
                    <Link to="/auth/join">Sign Up</Link>
                  </p>
                </div>
              </div>
            )}
          </UiForm>
        </div>
      </StyledAuthContent>
    </AuthLayoutStyling>
>>>>>>> 6bffce03b64efe0b63b9d439825c504718197bf3
  );
}

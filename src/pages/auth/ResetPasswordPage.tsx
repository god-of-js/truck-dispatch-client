import React, { lazy, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetUserPassword } from '../../modules/Account';

import { toAnyAction } from 'utils/helpers';
import ChangePasswordSchema from 'utils/validations/ChangePasswordSchema';
import { Toast } from 'utils/toast';

const UiForm = lazy(() => import('ui/UiForm'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiButton = lazy(() => import('ui/UiButton'));
const AuthLayoutStyling = lazy(
  () => import('components/layout/AuthLayoutStyling'),
);
const StyledAuthContent = lazy(
  () => import('components/auth/StyledAuthContent'),
);

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: '',
    cPassword: '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function resetPassword() {
    setLoading(true);
    const searchUrl = new URLSearchParams(location.search);
    const token = searchUrl.get('token');
    if (!token) {
      Toast.error({ msg: 'No token was provided' });
      return;
    }
    dispatch(
      toAnyAction(
        resetUserPassword({ password: formData.password, token: token }),
      ),
    )
      .then(() => {
        navigate('/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const actionButtons = (
    <div className="">
      <UiButton size="large" isFullWidth loading={loading}>
        Reset Password
      </UiButton>
    </div>
  );

  return (
    <AuthLayoutStyling img invert isInvertedForm>
      <StyledAuthContent inverted>
        <div className="form-container">
          <header>
            <h1>Reset Password</h1>
            <p className="info-text">Must be at least 8 characters</p>
          </header>
          <UiForm
            schema={ChangePasswordSchema}
            formData={formData}
            onSubmit={resetPassword}
          >
            {({ errors }) => (
              <div className="form-container__inner">
                <UiInput
                  label="New Password*"
                  placeholder="Enter your new password"
                  value={formData.password}
                  name="password"
                  type="password"
                  error={errors.password}
                  onChange={handleChange}
                />
                <UiInput
                  label="Confirm Password*"
                  placeholder="Confirm your new password"
                  value={formData.cPassword}
                  name="cPassword"
                  type="password"
                  error={errors.cPassword}
                  onChange={handleChange}
                />
                <div className="hidden-in-mobile">{actionButtons}</div>

                <div className="bottom-actions">
                  <div className="visible-in-mobile">{actionButtons}</div>
                  <p id="hidden-in-mobile">
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
  );
}

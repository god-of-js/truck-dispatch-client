import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';

import { requestForgotPasswordLink } from '../../modules/Account';

import { toAnyAction } from 'utils/helpers';
import ForgotPasswordSchema from 'utils/validations/ForgotPasswordSchema';
import StyledAuthContent from 'components/auth/StyledAuthContent';

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

  const actionButtons = (
    <div className="button-flex">
      <Link to="/auth/login">
        <UiButton size="large" variant="secondary" isFullWidth>
          <UiIcon icon="ArrowLeft" />
          Back to sign in
        </UiButton>
      </Link>
      <UiButton
        size="large"
        isFullWidth
        loading={loading}
        onClick={() => {}}
      >
        RESET
      </UiButton>
    </div>
  );

  return (
    <AuthLayoutStyling invert img>
      <StyledAuthContent inverted>
        <div className="form-container">
          <header>
            <h1>Forgot password?</h1>
            <p>No worries, we’ll send you reset instructions</p>
          </header>
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
                <div>{actionButtons}</div>
                <div className="bottom-actions">
                  <div>{actionButtons}</div>
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

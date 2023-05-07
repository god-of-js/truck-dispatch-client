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

  function requestRecoveryLink() {
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
    <div className="duo-button-container no-btn-margin-top">
      <Link to="/auth/login">
        <UiButton size="large" variant="secondary" isFullWidth>
          <UiIcon icon="ArrowLeft" />
          Back to sign in
        </UiButton>
      </Link>
      <UiButton size="large" isFullWidth loading={loading}>
        Send recovery link
      </UiButton>
    </div>
  );

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <Page>
      <UiForm
        schema={ForgotPasswordSchema}
        formData={formData}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <>
            <Heading>Lost your password?</Heading>
            <p>
              To receive a signin link, enter the email address linked to your
              Truckdispatch account.
            </p>
            <Margin>
              <UiInput
                label="Email*"
                value={formData.email}
                name="email"
                error={errors.email}
                onChange={handleChange}
              />
            </Margin>
            <UiButton isFullWidth loading={loading}>
              Send recovery link
            </UiButton>
            <LinkToRegisteration>
              Remembered your password? <Link to="/auth/login">Sign In</Link>
            </LinkToRegisteration>
          </>
        )}
      </UiForm>
    </Page>
=======
=======
>>>>>>> 225bee80cc6b7b276b9b82a24de97850d7301c42
    <AuthLayoutStyling img invert isInvertedForm>
      <StyledAuthContent inverted>
        <div className="form-container">
          <header>
            <h1>Forgot password?</h1>
            <p className="info-text">
              No worries, we’ll send you reset instructions
            </p>
          </header>
          <UiForm
            schema={ForgotPasswordSchema}
            formData={formData}
            onSubmit={requestRecoveryLink}
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
<<<<<<< HEAD
>>>>>>> 6bffce03b64efe0b63b9d439825c504718197bf3
=======
>>>>>>> 225bee80cc6b7b276b9b82a24de97850d7301c42
  );
}

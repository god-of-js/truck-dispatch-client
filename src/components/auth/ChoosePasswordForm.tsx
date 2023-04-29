import React, { useState } from 'react';

import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import StyledAuthContent from './StyledAuthContent';
import { useDispatch } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { updatePassword } from 'modules/Account';
import ChangePasswordSchema from 'utils/validations/ChangePasswordSchema';
import { useNavigate } from 'react-router-dom';
import { removeAuthSessionId, removePresentAuthStage } from 'utils/localStorageMethods';

interface Props {
  goToNext: () => void;
}

export default function ChoosePasswordForm({ goToNext }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  function setPassword() {
    setLoading(true);
    dispatch(toAnyAction(updatePassword({ password: formData.password })))
      .then(() => {
        removeAuthSessionId();
        removePresentAuthStage();
        navigate('/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <StyledAuthContent>
      <div className="form-container">
        <header>
          <UiIcon icon="PasswordCheck" size="45" />
          <h1>Choose Password</h1>
          <p>Choose a strong password with at least 8 characters or more</p>
        </header>
        <UiForm
          formData={formData}
          schema={ChangePasswordSchema}
          onSubmit={setPassword}
        >
          {({ errors }) => (
            <div className="form-container__inner">
              <UiInput
                label="Password*"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                error={errors.password}
                name="password"
                onChange={handleChange}
              />
              <UiInput
                label="Confirm Password*"
                placeholder="Confirm password"
                type="password"
                value={formData.cPassword}
                error={errors.cPassword}
                name="cPassword"
                onChange={handleChange}
              />
              <UiButton size="large" variant="primary" loading={loading} isFullWidth>
                Continue
              </UiButton>
            </div>
          )}
        </UiForm>
      </div>
    </StyledAuthContent>
  );
}

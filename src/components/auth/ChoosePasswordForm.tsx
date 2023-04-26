import React, { useState } from 'react';

import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import StyledAuthContent from './StyledAuthContent';

interface Props {
  goToNext: () => void;
}

export default function ChoosePasswordForm({ goToNext }: Props) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }
  function onSubmit() {
    goToNext();
  }

  return (
    <StyledAuthContent>
      <div className="form-container">
        <header>
          <UiIcon icon="PasswordCheck" size="45" />
          <h1>Choose Password</h1>
          <p>Choose a strong password with at least 8 characters or more</p>
        </header>
        <UiForm formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <div className="form-container__inner">
              <UiInput
                label="Password*"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
              <UiInput
                label="Confirm Password*"
                placeholder="Confirm password"
                type="password"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />
              <UiButton size="large" variant="primary" isFullWidth>
                Continue
              </UiButton>
            </div>
          )}
        </UiForm>
      </div>
    </StyledAuthContent>
  );
}

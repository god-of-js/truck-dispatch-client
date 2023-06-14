import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import StyledAuthContent from 'components/auth/StyledAuthContent';
import VerifyPhoneForm from 'components/auth/VerifyPhoneForm';

export default function VerifyPhonePage() {
  const navigate = useNavigate();
  function goToLogin() {
    navigate('/auth/login');
  }

  return (
    <AuthLayoutStyling img invert isInvertedForm>
      <StyledAuthContent inverted>
        <div className="form-container">
          <VerifyPhoneForm goToNext={goToLogin} />
          <div className="bottom-actions">
            <p>
              <span>Have another account?</span>{' '}
              <Link to="/auth/login">Sign In</Link>
            </p>
          </div>
        </div>
      </StyledAuthContent>
    </AuthLayoutStyling>
  );
}

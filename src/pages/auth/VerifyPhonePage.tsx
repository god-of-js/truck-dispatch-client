import React, { lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthLayoutStyling = lazy(
  () => import('components/layout/AuthLayoutStyling'),
);
const VerifyPhoneForm = lazy(() => import('components/auth/VerifyPhoneForm'));
const StyledAuthContent = lazy(
  () => import('components/auth/StyledAuthContent'),
);

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

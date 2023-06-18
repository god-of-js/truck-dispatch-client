import React from 'react';
import NotFoundImage from 'assets/img/not-found.svg';
import { ErrorStyling } from './ErrorsStyling';
import UiButton from 'ui/UiButton';
import { useNavigate } from 'react-router-dom';

export default function NotFoundErrorPage() {
  const navigate = useNavigate()
  return (
    <ErrorStyling>
      <h1>404</h1>
      <p>Page not found</p>
        <img src={NotFoundImage} alt="notfound" />
      <div className="button-container">
        <UiButton variant="secondary" onClick={() => navigate('/')}>
          Go to Dashboard
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

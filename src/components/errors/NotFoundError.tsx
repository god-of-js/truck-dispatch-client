import React from 'react';
import NotFoundImage from 'assets/img/not-found.svg';
import Unauthorized from 'assets/img/unauthorized.svg';
import { ErrorStyling } from './ErrorsStyling';
import UiButton from 'ui/UiButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  subtitle?: string;
  goToRoute?: string;
  buttonText?: string;
  unauthorizedIsActive?: boolean;
}
export default function NotFoundErrorPage({
  title = '404',
  subtitle = 'Page not found',
  goToRoute = '/',
  buttonText = 'Go to Dashboard',
  unauthorizedIsActive,
}: Props) {
  const navigate = useNavigate();
  return (
    <ErrorStyling>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {!unauthorizedIsActive ? (
        <img src={NotFoundImage} alt="notfound" />
      ) : (
        <img src={Unauthorized} alt="notfound" />
      )}
      <div className="button-container">
        <UiButton variant="secondary" onClick={() => navigate(goToRoute)}>
          {buttonText}
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

import React from 'react';
import NotFoundImage from 'assets/img/not-found.svg';
import { ErrorStyling } from './ErrorsStyling';
import UiButton from 'ui/UiButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  subtitle?: string;
  goToRoute?: string;
}
export default function NotFoundErrorPage({
  title = '404',
  subtitle = 'Page not found',
  goToRoute = '/',
}: Props) {
  const navigate = useNavigate();
  return (
    <ErrorStyling>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <img src={NotFoundImage} alt="notfound" />
      <div className="button-container">
        <UiButton variant="secondary" onClick={() => navigate(goToRoute)}>
          Go to Dashboard
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

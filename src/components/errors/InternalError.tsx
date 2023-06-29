import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerErrorImage from 'assets/img/server-error.svg';
import { ErrorStyling } from './ErrorsStyling';

const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  title?: string;
  subtitle?: string;
  goToRoute?: string;
}
export default function InternalError({
  title = 'Oops!',
  subtitle = 'Something went wrong! Kindly reach out to the team for additional assistance.',
  goToRoute = '/',
}: Props) {
  const navigate = useNavigate();

  return (
    <ErrorStyling>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div>
        <img src={ServerErrorImage} alt="notfound" />
      </div>
      <div className="button-container">
        <UiButton variant="secondary" onClick={() => navigate(goToRoute)}>
          Go to Dashboard
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

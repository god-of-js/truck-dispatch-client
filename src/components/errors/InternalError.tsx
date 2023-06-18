import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerErrorImage from 'assets/img/server-error.svg';
import { ErrorStyling } from './ErrorsStyling';

const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  title?: string;
  subtitle?: string;
}
export default function InternalError({
  title = 'Oops!',
  subtitle = 'Something went wrong',
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
        <UiButton variant="secondary" onClick={() => navigate('/')}>
          Go to Dashboard
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

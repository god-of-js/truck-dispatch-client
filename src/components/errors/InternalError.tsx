import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerErrorImage from 'assets/img/server-error.svg';
import Disconnect from 'assets/img/disconnect.svg';
import { ErrorStyling } from './ErrorsStyling';

const UiButton = lazy(() => import('ui/UiButton'));

export interface Props {
  title?: string;
  subtitle?: string;
  goToRoute?: string;
  buttonText?: string;
  disconnetIsActive?: boolean;
}
export default function InternalError({
  title = 'Oops!',
  subtitle = 'Something went wrong! Kindly reach out to the team for additional assistance.',
  goToRoute = '/',
  buttonText = 'Go to Dashboard',
  disconnetIsActive,
}: Props) {
  const navigate = useNavigate();

  return (
    <ErrorStyling>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div>
        {!disconnetIsActive ? (
          <img src={ServerErrorImage} alt="notfound" />
        ) : (
          <img src={Disconnect} alt="notfound" />
        )}
      </div>
      <div className="button-container">
        <UiButton variant="secondary" onClick={() => navigate(goToRoute)}>
          {buttonText}
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

import React, { lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Disconnect from 'assets/img/disconnect.svg';
import NotFoundImage from 'assets/img/not-found.svg';
import Unauthorized from 'assets/img/unauthorized.svg';
import { ErrorStyling } from './ErrorsStyling';

const UiButton = lazy(() => import('ui/UiButton'));

export interface Props {
  errorCode?: number;
  title?: string;
  subtitle?: string;
  goToRoute?: string;
  buttonText?: string;
}
export default function InternalError({
  errorCode,
  subtitle = 'Something went wrong! Kindly reach out to the team for additional assistance.',
  goToRoute = '/',
  buttonText = 'Go to Dashboard',
}: Props) {
  const navigate = useNavigate();

  const allowedErrorCodes = [500, 404, 401]

  const errorDetails = useMemo(() => {
    let img = Disconnect, errorSubtitle = subtitle;

    if (errorCode === 404) {
      img = NotFoundImage;
      errorSubtitle = 'Not found'
    }

    if (errorCode === 401) {
      img = Unauthorized;
      errorSubtitle = 'Unauthorized'
    }

    return {
      img,
      subtitle: errorSubtitle,
    }
  }, [errorCode])

  return (
    <ErrorStyling>
      <h1>{allowedErrorCodes.includes(errorCode!)? errorCode : 500}</h1>
      <p>{errorDetails.subtitle}</p>
      <div>
        <img src={errorDetails.img} alt="Something went wrong image" />
      </div>
      <div className="button-container">
        <UiButton variant="secondary" onClick={() => navigate(goToRoute)}>
          {buttonText}
        </UiButton>
      </div>
    </ErrorStyling>
  );
}

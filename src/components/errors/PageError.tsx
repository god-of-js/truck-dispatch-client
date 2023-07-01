import React, { lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Disconnect from '../../assets/img/disconnect.svg';
import NotFoundImage from '../../assets/img/not-found.svg';
import Unauthorized from '../../assets/img/unauthorized.svg';

const UiButton = lazy(() => import('ui/UiButton'));

export interface Props {
  errorCode?: number;
  title?: string;
  subtitle?: string;
  goToRoute?: string;
  buttonText?: string;
}
export default function PageError({
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


const ErrorStyling = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-weight: 900;
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(37)};
  }

  p {
    font-weight: 700;
    font-size: ${pxToRem(24)};
    line-height: ${pxToRem(28)};
    max-width: ${pxToRem(400)};
    margin: auto;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${pxToRem(48)};

    button {
      min-width: ${pxToRem(182)};
    }
  }
`;

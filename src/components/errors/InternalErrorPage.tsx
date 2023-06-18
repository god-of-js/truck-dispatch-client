import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServerErrorImage from 'assets/img/server-error.svg';
import { ErrorStyling } from './ErrorsStyling';
import UiButton from 'ui/UiButton';

interface Props {
  children?: React.ReactNode;
}

export default function InternalErrorPage({ children }: Props) {
  const Navigate = useNavigate();

  return (
    <ErrorStyling id="server-error-page">
      <div>
        <h1>Oops!</h1>
        <p>Something went wrong</p>
        <div>
          <img src={ServerErrorImage} alt="notfound" height="350" width="350" />
        </div>
        <div className="button-container">
          {!children ? (
            <UiButton variant="secondary" onClick={() => Navigate('/')}>
              Go to Dashboard
            </UiButton>
          ) : (
            children
          )}
        </div>
      </div>
    </ErrorStyling>
  );
}

import React from 'react';
import ServerErrorImage from 'assets/img/server-error.svg';
import { ErrorStyling } from './ErrorsStyling'

interface Props {
  children?: React.ReactNode;
}

export default function InternalErrorPage({ children }: Props) {
  return (
    <ErrorStyling id="server-error-page">
      <div>
        <h1>Oops!</h1>
        <p>Something went wrong</p>
        <div>
          <img src={ServerErrorImage} alt="notfound" height="350" width="350" />
        </div>
        <div>{children}</div>
      </div>
    </ErrorStyling>
  );
}


import React from 'react';
import styled from 'styled-components';
import NotFoundImage from 'assets/img/not-found.svg'
import { ErrorStyling } from './ErrorsStyling'

interface Props {
  children?: React.ReactNode;
}

export default function NotFound({ children }: Props) {
  return (
    <ErrorStyling id="error-page">
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <div>
          <img src={NotFoundImage} alt="notfound" height="350" width="350"/>
        </div>
        <div>{children}</div>
      </div>
    </ErrorStyling>
  );
}


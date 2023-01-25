import React from 'react';
import { useRouteError } from 'react-router-dom';
import { StringLiteralLike } from 'typescript';

interface ComponentError {
  data?: string;
  error?: string;
  status?: number;
  statusText?: string;
}

interface Props {
  error: ComponentError;
}

const ErrorPage: React.FC<Props> = ({ error }) => {
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status} {error.statusText}
        </i>
      </p>
    </div>
  );
};

export default function useErrorPage() {
  const error = useRouteError() as ComponentError;
  return <ErrorPage error={error} />;
}

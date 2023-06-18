import React from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

interface Props {
  children?: React.ReactNode;
}

export default function ErrorPage({ children }: Props) {
  return (
    <ErrorPageContainer id="error-page">
      <div>
        <h1>404</h1>
        <p className="error-text-p">Page not found</p>
        <p className="error-text-w">We are working on it!!!</p>
        <div>
          <UiIcon icon="NotFound" size="350" />
        </div>
        <div>{children}</div>
      </div>
    </ErrorPageContainer>
  );
}

const ErrorPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-weight: 900;
    font-size: 32px;
    line-height: 37px;
  }

  .error-text-p {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
  }

  .error-text-w {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
  }
`;

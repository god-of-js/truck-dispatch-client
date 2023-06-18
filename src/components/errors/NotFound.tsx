import React from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

interface Props {
  children?: React.ReactNode;
}

export default function NotFound({ children }: Props) {
  return (
    <NotfoundContainer id="error-page">
      <div>
        <h1>404</h1>
        <p className="error-text-p">Page not found</p>
        <p className="error-text-w">We are working on it!!!</p>
        <div>
          <UiIcon icon="NotFound" size="350" />
        </div>
        <div>{children}</div>
      </div>
    </NotfoundContainer>
  );
}

const NotfoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-weight: 900;
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(37)};
  }

  .error-text-p {
    font-weight: 700;
    font-size: ${pxToRem(24)};
    line-height: ${pxToRem(28)};
  }

  .error-text-w {
    font-weight: 600;
    font-size: ${pxToRem(18)};
    line-height: ${pxToRem(21)};
  }
`;

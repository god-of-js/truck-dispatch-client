import React from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

interface Props {
  children?: React.ReactNode;
}

export default function ServerError({ children }: Props) {
  return (
    <SeverErrorContainer id="server-error-page">
      <div>
        <h1>Oops!</h1>
        <p>Something went wrong</p>
        <div>
          <UiIcon icon="ServerError" size="350" />
        </div>
        <div>{children}</div>
      </div>
    </SeverErrorContainer>
  );
}

const SeverErrorContainer = styled.div`
  display: flex;
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
  }
`;

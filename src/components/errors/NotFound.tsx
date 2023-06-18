import React from 'react';
import styled from 'styled-components';
import NotFoundImage from 'assets/img/not-found.svg'

interface Props {
  children?: React.ReactNode;
}

export default function NotFound({ children }: Props) {
  return (
    <NotfoundContainer id="error-page">
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <div>
          <img src={NotFoundImage} alt="notfound" height="350" width="350"/>
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

  p{
    font-weight: 700;
    font-size: ${pxToRem(24)};
    line-height: ${pxToRem(28)};
  }
`;

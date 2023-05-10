import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export default function Loader() {
  return (
    <>
      <GlobalStyle />
      <LoaderStyle>
        <div className="LoadingSpinner">
          <div className="Spinner"></div>
        </div>
      </LoaderStyle>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
  }
`;

const LoaderStyle = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .Spinner {
    border: 6px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000000;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

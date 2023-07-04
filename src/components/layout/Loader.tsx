import React from 'react';
import styled from 'styled-components';
import { Size } from 'types/Size';

interface Props {
  size?: Size;
  variant?: 'white' | 'primary';
  isPage?: boolean;
}

function sizeVar(size: Size) {
  if (size === 's') {
    return `
   width: ${pxToRem(16)};
   height: ${pxToRem(16)};
   border: ${pxToRem(3)} solid rgba(0, 0, 0, 0.1);
   `;
  }
  if (size === 'md') {
    return `
   width: ${pxToRem(20)};
   height: ${pxToRem(20)};
   border: ${pxToRem(3)} solid rgba(0, 0, 0, 0.1);
   `;
  }
  if (size === 'large') {
    return `
   width: ${pxToRem(50)};
   height: ${pxToRem(50)};
   border: ${pxToRem(5)} solid rgba(0, 0, 0, 0.1);
   `;
  }
}

export default function Loader({
  variant = 'primary',
  size = 'large',
  isPage,
}: Props) {
  return (
    <LoaderContainer isPage={isPage}>
      <LoaderStyle size={size}>
        <div className="loadingSpinner">
          <div className={`spinner ${variant}`}></div>
        </div>
      </LoaderStyle>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div<{ isPage?: boolean }>`
  height: ${({ isPage }) => (isPage ? '100vh' : '100%')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderStyle = styled.div<Props>`
  .loadingSpinner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    ${({ size }) => sizeVar(size!)}
    border-radius: 50%;
    animation: spin 1s linear infinite;

    &.primary {
      border-left-color: var(--color-primary);
    }

    &.white {
      border-left-color: #fff;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

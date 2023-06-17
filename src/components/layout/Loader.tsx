import React from 'react';
import styled from 'styled-components';

interface Props {
  size?: 'lg' | 's';
  variant?: 'white' | 'primary';
  isPage?: boolean;
}

type Sizes = 'lg' | 's';

function sizeVar(size: Sizes) {
  if (size === 's') {
    return `
   width: ${pxToRem(20)};
   height: ${pxToRem(20)};
   border: ${pxToRem(3)} solid rgba(0, 0, 0, 0.1);
   `;
  }
  if (size === 'lg') {
    return `
   width: ${pxToRem(50)};
   height: ${pxToRem(50)};
   border: ${pxToRem(5)} solid rgba(0, 0, 0, 0.1);
   `;
  }
}

export default function Loader({
  variant = 'primary',
  size = 'lg',
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

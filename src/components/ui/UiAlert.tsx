import React from 'react';
import styled from 'styled-components';
import UiIcon from './UiIcon';

type Variant = 'warning' | 'success' | 'danger' | 'neutral';
interface Props {
  variant?: Variant;
  children: React.ReactNode;
}
export default function UiAlert({ variant = 'neutral', children }: Props) {
  return (
    <Alert variant={variant}>
      <div>{children}</div>
      <button>
        <UiIcon icon="X" />
      </button>
    </Alert>
  );
}

function generateSchemeBasedOnVariant(variant: Variant): string {
  if (variant === 'warning') {
    return `
      background-color: var(--color-warning-100);
      color: var(--color-warning-600);
      border: ${pxToRem(1)} solid var(--color-warning-200);
      
     a, button {color: var(--color-warning-600);}`;
  }
  return `
    background-color: white;
    color: var(--color-gray-600);
    border: ${pxToRem(1)} solid var(--color-gray-200);
    a, button {color: var(--color-gray-600);}
  `;
}

const Alert = styled.div`
  font-size: ${pxToRem(14)};
  padding: ${pxToRem(8)};
  border-radius: ${pxToRem(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ variant }: { variant: Variant }) =>
    generateSchemeBasedOnVariant(variant)}
  a {
    text-decoration: underline;
  }

  button {
    background-color: transparent;
    border: transparent;
    cursor: pointer;
  }
`;

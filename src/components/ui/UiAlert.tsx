import React, { useState } from 'react';
import styled from 'styled-components';
import UiIcon from './UiIcon';

type Variant = 'warning' | 'success' | 'danger' | 'neutral' | 'info' | 'gray';
interface Props {
  variant?: Variant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  alignTo?: string;
}
export default function UiAlert({
  variant = 'neutral',
  children,
  icon,
  alignTo = 'center',
}: Props) {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  return (
    <>
      {isAlertVisible && (
        <Alert variant={variant}>
          {icon ? (
            icon
          ) : (
            <button onClick={() => setIsAlertVisible(false)}>
              <UiIcon icon="X" />
            </button>
          )}

          <div>{children}</div>
        </Alert>
      )}
    </>
  );
}

function generateSchemeBasedOnVariant(variant: Variant): string {
  if (variant) {
    return `
      background-color: var(--color-${variant}-20);
      color: var(--color-${variant}-80);
      border: ${pxToRem(1)} solid var(--color-${variant}-30);
      a, button {color: var(--color-${variant}-80);}
      span {
        fill: var(--color-${variant}-80);
      }
      `;
  }
  return `
    background-color: white;
    color: var(--color-gray-80);
    border: ${pxToRem(1)} solid var(--color-gray-30);
    a, button {color: var(--color-gray-80);}
  `;
}

const Alert = styled.div`
  font-size: ${pxToRem(14)};
  padding: ${pxToRem(16)};
  border-radius: ${pxToRem(4)};
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(9.4)};
  line-height: ${pxToRem(24)};
  ${({ variant }: { variant: Variant }) =>
    generateSchemeBasedOnVariant(variant)}
  a {
    text-decoration: underline;
  }

  button {
    background-color: transparent;
    border: transparent;
    cursor: pointer;
    margin-top: 0 !important;
  }

  .children {
    display: flex;
    align-items: center;
  }
`;

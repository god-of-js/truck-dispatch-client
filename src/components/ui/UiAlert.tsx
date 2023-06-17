import React, { lazy, useState } from 'react';
import styled from 'styled-components';

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
              {/* <UiIcon icon="X" /> */}
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
      border:1px solid var(--color-${variant}-30);
      a, button {color: var(--color-${variant}-80);}
      span {
        fill: var(--color-${variant}-80);
      }
      `;
  }
  return `
    background-color: white;
    color: var(--color-gray-80);
    border:1px solid var(--color-gray-30);
    a, button {color: var(--color-gray-80);}
  `;
}

const Alert = styled.div`
  font-size: 14px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 9.4px;
  line-height: 24px;
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

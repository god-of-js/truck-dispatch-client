import React, { lazy, useState } from 'react';
import styled from 'styled-components';
// TODO: refactor if needed in another place and styling gets consistent.
// Add styling variants or props. e.g: withTitle, withIcon, e.t.c.
const UiButton = lazy(() => import('./UiButton'));
const UiIcon = lazy(() => import('./UiIcon'));

type Variant = 'warning' | 'success' | 'danger' | 'neutral' | 'info' | 'gray';
interface Props {
  variant?: Variant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  alignCenter?: boolean;
  isClosable?: boolean;
}
export default function UiAlert({
  variant = 'neutral',
  children,
  icon,
  alignCenter,
  isClosable,
}: Props) {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  return (
    <Alert variant={variant} alignCenter={alignCenter}>
      {isAlertVisible && (
        <div className="ui-alert">
          {icon}

          <div className="content">{children}</div>
          {isClosable && (
            <UiButton
              variant="icon-neutral"
              size="s"
              onClick={() => setIsAlertVisible(false)}
            >
              <UiIcon icon="Close" />
            </UiButton>
          )}
        </div>
      )}
    </Alert>
  );
}

function generateSchemeBasedOnVariant(variant: Variant): string {
  if (variant) {
    return `
      background-color: var(--color-${variant}-20);
      color: var(--color-${variant}-80);
      border: ${pxToRem(1)} solid var(--color-${variant}-30);
      a {color: var(--color-${variant}-80);}
      span {
        fill: var(--color-${variant}-80);
      }
      `;
  }
  return `
    background-color: white;
    color: var(--color-gray-80);
    border: ${pxToRem(1)} solid var(--color-gray-30);
    a {color: var(--color-gray-80);}
  `;
}

const Alert = styled.div<{ variant: Variant; alignCenter?: boolean }>`
  .ui-alert {
    font-size: ${pxToRem(14)};
    padding: ${pxToRem(16)};
    border-radius: ${pxToRem(8)};
    display: flex;
    justify-content: space-between;
    gap: ${pxToRem(9.4)};
    line-height: ${pxToRem(24)};
    ${({ variant }) => generateSchemeBasedOnVariant(variant)}
    ${({ alignCenter }) => alignCenter && `align-items: center;`}
    a {
      text-decoration: underline;
    }

    .content {
      width: 100%;
    }
    .children {
      display: flex;
      align-items: center;
    }
  }
`;

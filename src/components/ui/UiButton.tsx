import React, { lazy } from 'react';
import styled from 'styled-components';
import { Size } from 'types/Size';

const Loader = lazy(() => import('components/layout/Loader'));
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger-secondary'
  | 'warning-secondary'
  | 'success-secondary'
  | 'tertiary'
  | 'neutral'
  | 'icon-neutral'
  | 'primary-text'
  | 'danger';
interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: Size;
  type?: 'submit' | 'button';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal';
  /** This prop decides if we want the button to fit the content or be full width */
  isFullWidth?: boolean;
  onClick?: (e?: any) => void;
}

export default function UiButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  type = 'submit',
  textCasing = 'uppercase',
  size = 'md',
  isFullWidth = false,
}: Props) {
  return (
    <Button
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      textCasing={textCasing}
      size={size}
      isFullWidth={isFullWidth}
    >
      {loading ? (
        <div className="loader-wrapper">
          <Loader variant="white" size="s" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

function sizeVariant(size: Size) {
  if (size === 'text') return '';
  if (size === 's')
    return `
    padding: 8px;
    12px; 
    height: 32px;
    font-size: 12px;
    line-height:  12px;
    `;

  if (size === 'md')
    return `
    padding: 12px;
    height: 44px;
    font-size: 12px;
    line-height: 12px;
  `;

  if (size === 'large')
    return `
    padding:  16px; 
    height: 48px;
    font-size: 14px;
    line-height: 14px;
  `;
}

function getColor(condition: boolean, color: string) {
  if (condition) return `background: ${color};`;
  return '';
}

const Button = styled.button<Props>`
  ${({ size }) => sizeVariant(size!)}
  border: none;
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  letter-spacing: 0.32px;
  text-align: center;
  border-radius: ${pxToRem(8)};
  font-weight: 500;
  font-family: 'thiccboi-semibold';
  ${({ textCasing }) =>
    textCasing !== 'normal' && `text-transform: ${textCasing}`};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  .loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
    width: 100%;
    height: 100%;
  }

  &.primary {
    background-color: var(--color-primary);
    ${({ disabled, loading }) =>
      getColor(disabled! && !loading, 'var(--color-primary-20)')};
    ${({ loading }) => getColor(loading!, 'var(--color-primary-50)')};
    color: white;

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      background-color: var(--color-primary-50);
      box-shadow: var(--box-shadow-primary);
    }`}

    svg {
      fill: white;
    }
  }
  &.danger {
    background-color: var(--color-danger);
    color: white;

    &:hover {
      background-color: var(--color-danger-40);
    }
  }

  &.primary-text {
    background: transparent;
    border-color: transparent;
    color: var(--color-primary);
  }

  &.icon-neutral {
    background: var(--color-gray-20);
    border-radius: 8px;

    &:hover {
      background: var(--color-gray-30);
    }
  }

  &.neutral {
    background-color: var(--color-gray-20);
    border: 1px solid var(--color-gray-40);
    color: var(--color-gray-500);

    &:hover {
      background-color: var(--color-gray-200);
    }
  }

  &.secondary {
    background-color: var(--color-primary-10);
    color: var(--color-primary);
    svg {
      fill: ${({ disabled }) =>
        disabled ? 'var(--color-primary-30)' : 'var(--color-primary)'};
    }
    ${({ disabled }) => getColor(disabled!, `var(--color-primary-10)`)};
    ${({ disabled }) => disabled && `color: var(--color-primary-30);`}

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      background: var(--color-primary-20);
      box-shadow: var(--box-shadow-primary);
    }`}
  }

  &.tertiary {
    background-color: #ffff;
    color: var(--color-primary);

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      color: var(--color-primary-50);
    }`}
  }

  &.success-secondary {
    background: var(--color-success-10);
    color: var(--color-success);

    svg {
      fill: var(--color-success);
    }
    ${({ disabled }) =>
      !disabled &&
      `
      
    &:hover {
      background: var(--color-success-20);
      box-shadow: var(--box-shadow-primary);
    }
    `}
  }
  &.danger-secondary {
    background: var(--color-danger-10);
    color: var(--color-danger);

    svg {
      fill: var(--color-danger);
    }
    &:hover {
      background: var(--color-danger-20);
      box-shadow: var(--box-shadow-primary);
    }
  }
  &.warning-secondary {
    background: var(--color-warning-10);
    color: var(--color-warning);

    svg {
      fill: var(--color-warning);
    }

    ${({ disabled }) =>
      !disabled &&
      '&:hover {background: var(--color-warning-20); box-shadow: var(--box-shadow-primary); }'}
  }
`;

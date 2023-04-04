import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'neutral'
    | 'primary-outlined'
    | 'secondary-outlined'
    | 'primary-text'
    | 'dark'
    | 'dark-outlined'
    | 'danger';
  size?: Sizes;
  type?: 'submit' | 'button';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  isSquare?: boolean;
  /** This prop decides if we want the button to fit the content or be full width */
  isFullWidth?: boolean;
  onClick?: () => void;
}

type Sizes = 'large' | 'md' | 's' | 'icon';

export default function UiButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  isSquare = false,
  variant = 'primary',
  type = 'submit',
  textCasing = 'uppercase',
  size = 'md',
  isFullWidth = false,
}: Props) {
  return (
    <ButtonContainer
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      textCasing={textCasing}
      size={size}
      isFullWidth={isFullWidth}
      isSquare={isSquare}
    >
      {loading ? <span>Loading...</span> : children}
    </ButtonContainer>
  );
}

function sizeVariant(size: Sizes) {
  if (size === 's')
    return `
    padding: ${pxToRem(8)} 
    ${pxToRem(12)}; 
    height:${pxToRem(32)};
    font-size: ${pxToRem(12)};
    `;

  if (size === 'md')
    return `
    padding: ${pxToRem(12)};
    height:${pxToRem(40)};
    font-size: ${pxToRem(12)};
  `;

  if (size === 'large')
    return `
    padding:  ${pxToRem(16)} 0; 
    height:${pxToRem(46)};
    font-size: ${pxToRem(14)} ;
  `;
}

function getColor(condition: boolean, color: string) {
  if (condition) return `background: ${color};`;
  return '';
}

const ButtonContainer = styled.button<Props>`
  ${({ size }) => sizeVariant(size!)}
  border: none;
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.4px;
  line-height: 1.45;
  text-align: center;
  text-transform: uppercase;
  border-radius: ${({ isSquare }) => (isSquare ? '' : pxToRem(8))};
  font-weight: 500;
  font-family: 'thiccboi-semibold';
  text-transform: ${({ textCasing }) => textCasing};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  &.primary {
    background-color: var(--color-primary);
    ${({ disabled }) => getColor(disabled!, 'var(--color-primary-20)')};
    color: white;

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      background-color: var(--color-primary-50);
      box-shadow: var(--box-shadow-primary);
    }`}
  }
  &.danger {
    background-color: var(--color-danger-600);
    color: white;

    &:hover {
      background-color: var(--color-danger-700);
    }
  }

  &.primary-text {
    background: transparent;
    border-color: transparent;
    color: var(--color-primary);
  }

  &.neutral {
    background-color: var(--color-gray-100);
    border: 1px solid var(--color-gray-200);
    color: var(--color-gray-500);

    &:hover {
      background-color: var(--color-gray-200);
    }
  }

  &.primary-outlined {
    background: white;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
  &.dark-outlined {
    color: var(--color-gray-900);
    background: transparent;
    border: 1px solid var(--color-gray-900);
    &:hover {
      background-color: var(--color-gray-100);
    }
  }

  &.secondary {
    background-color: var(--color-primary-10);
    color: var(--color-primary);
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

  &.dark {
    background: var(--color-gray-900);
    color: white;

    &:hover {
      background: var(--color-gray-700);
    }
  }

  &.secondary-outlined {
    background-color: white;
    border: 1px solid var(--color-gray-400);
    color: var(--color-gray-400);
  }
`;

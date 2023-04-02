import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'primary-outlined'
    | 'secondary-outlined'
    | 'primary-text'
    | 'dark'
    | 'dark-outlined'
    | 'icon'
    | 'danger';
  size?: Sizes;
  type?: 'submit' | 'button';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  isSquare?: boolean;
  /** This prop decides if we want the button to fit the content or be full width */
  isFullWidth?: boolean;
  onClick?: () => void;
}

type Sizes = 'large' | 'md' | 's';

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
    font-size: ${pxToRem(12)};
    `;

  if (size === 'md')
    return `
    padding: ${pxToRem(12)};
    font-size: ${pxToRem(12)};
  `;

  if (size === 'large')
    return `
    padding:  ${pxToRem(16)};
    font-size: ${pxToRem(14)} ;
  `;
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
  text-transform: ${({ textCasing }) => textCasing};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  white-space: nowrap;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  transition :all .2s ease-in-out;

  &.primary {
    background-color: var(--color-primary);
    color: white;

    &:hover {
      background-color: var(--color-primary-400);
    }
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

  &.icon {
    background: transparent;
    border-radius: 50%;
    width: ${pxToRem(32)};
    height: ${pxToRem(32)};
    padding: ${pxToRem(12)};

    &:hover {
      background-color: var(--color-gray-100);
    }
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
    background-color: var(--color-gray-100);
    color: var(--color-gray-700);
    &:hover {
      background: var(--color-gray-200);
    }
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

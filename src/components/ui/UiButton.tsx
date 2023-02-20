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
    | 'primary-text';
  size?: 'large' | 'md' | 's';
  type?: 'submit' | 'button';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  /** This prop decides if we want the button to fit the content or be full width */
  isFullWidth?: boolean;
  onClick?: () => void;
}

export default function UiButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  type = 'submit',
  textCasing = 'uppercase',
  size = 'large',
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
    >
      {loading ? <span>Loading...</span> : children}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<Props>`
  padding: ${pxToRem(12)};
  border: none;
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  letter-spacing: 0.4px;
  line-height: 1.45;
  text-align: center;
  text-transform: uppercase;
  border-radius: ${pxToRem(4)};
  font-weight: 900;
  text-transform: ${({ textCasing }) => textCasing};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  white-space: nowrap;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};

  &.primary {
    background-color: var(--color-primary);
    color: white;

    &:hover {
      background-color: var(--color-primary-600);
    }
  }
  &.primary-text {
    background: transparent;
    border-color: transparent;
    color: var(--color-primary);
  }
  &.neutral {
    background-color: var(--color-gray-200);
    color: var(--color-gray-900);
  }

  &.primary-outlined {
    background: white;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  &.secondary {
    background-color: var(--color-gray-100);
    color: var(--color-gray-700);
    &:hover {
      background: var(--color-gray-100);
    }
  }

  &.secondary-outlined {
    background-color: white;
    border: 1px solid var(--color-gray-400);
    color: var(--color-gray-400);
  }
`;

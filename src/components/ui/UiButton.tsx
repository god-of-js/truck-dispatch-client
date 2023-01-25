import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'neutal'
    | 'primary-outlined'
    | 'secondary-outlined';
  size?: 'large' | 'medium' | 'small';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  /** This prop decides if we want the button to fit the content or be full width */
  fitContent?: boolean;
  onClick?: () => void;
}

export const UiButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <ButtonContainer
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<Props>`
  padding: 12px 16px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  letter-spacing: 0.4px;
  line-height: 1.45;
  text-align: center;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 900;
  text-transform: ${({ textCasing = 'uppercase' }) => textCasing};
  width: ${({ fitContent = false }) => (fitContent ? 'fit-content' : '100%')};

  &.primary {
    background-color: var(--color-primary);
    color: white;

    &:hover {
      background-color: var(--color-primary-dark);
    }
  }

  &.primary-outlined {
    background: white;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  &.secondary {
    background-color: var(--color-gray-100);
    color: var(--color-gray-700);
  }

  &.secondary-outlined {
    background-color: white;
    border: 1px solid var(--color-gray-400);
    color: var(--color-gray-400);
  }
`;

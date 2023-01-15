import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'neutal' | 'primary-outlined';
  size?: 'large' | 'medium' | 'small';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary-outlined',
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

export default Button;

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
  color: #ffffff;

  &.primary {
    background-color: rgb(44, 155, 242);
  }
  &.primary-outlined {
    background: white;
    border: white;
  }
`;

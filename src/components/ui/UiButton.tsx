import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'neutal' | 'primary-outlined';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize';
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
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

export default Button;

const ButtonContainer = styled.button<Props>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props: Props) =>
    props.variant === 'primary' ? '#4CAF50' : '#f44336'};
  text-transform: ${({ textCasing = 'uppercase' }) => textCasing};
`;

import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UiInput: React.FC<Props> = ({
  label,
  type = 'text',
  value,
  onChange,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        isFocused={isFocused}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

const Input = styled.input`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: stretch;
  padding: 4px 8px;
  gap: 8px;
  width: 100%;
  height: 32px;
  align-self: stretch;
  border: 1px solid
    ${({ isFocused }: { isFocused: boolean }) =>
      isFocused ? 'var(--color-primary)' : 'var(--color-gray-300)'};
  background: #ffffff;
  outline: none;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  color: var(--color-gray-500);
  font-weight: bold;
`;

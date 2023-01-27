import React, { useState } from 'react';
import styled from 'styled-components';
import UiField from './UiField';

interface Props {
  label: string;
  type?: 'text' | 'password' | 'number' | 'phone';
  value: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UiInput({
  label,
  type = 'text',
  name,
  value,
  error,
  onChange,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <UiField label={label} name={name} error={error}>
      <Input
        type={type}
        value={value}
        name={name}
        hasError={!!error}
        isFocused={isFocused}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </UiField>
  );
}

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: 4px 8px;
  gap: 8px;
  width: 100%;
  height: 52px;
  font-size: 14px;
  border: 1px solid
    ${({ isFocused, hasError }: { isFocused: boolean; hasError: boolean }) =>
      isFocused
        ? 'var(--color-primary)'
        : hasError
        ? 'var(--color-danger)'
        : 'var(--color-gray-200)'};
  background: #ffffff;
  outline: none;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
  box-sizing: border-box;
`;

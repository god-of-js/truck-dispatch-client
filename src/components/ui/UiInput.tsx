import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';
import UiIcon from './UiIcon';
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
  const [inputType, setInputType] = useState(type);

  function sendPhone(value: string | undefined) {
    onChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  function handlePasswordTypeToText() {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  }
  return (
    <UiField label={label} name={name} error={error}>
      <InputContainer>
        {inputType === 'phone' ? (
          <PhoneInput
            value={value}
            country="NG"
            className={'phone-input'}
            placeholder="e.g: 08034283438"
            onChange={(e) => sendPhone(e)}
          />
        ) : (
          <Input
            type={inputType}
            value={value}
            name={name}
            hasError={!!error}
            onChange={onChange}
          />
        )}

        {type === 'password' && (
          <IconButton onClick={handlePasswordTypeToText}>
            <UiIcon icon={inputType === 'password' ? 'Eye' : 'EyeSlash'} />
          </IconButton>
        )}
      </InputContainer>
    </UiField>
  );
}

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: 16px 8px;
  gap: 8px;
  width: 100%;
  height: 40px;
  font-size: 12px;
  border: 1px solid;
  border-color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray-200)'};
  background: #ffffff;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: var(--color-primary);
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const IconButton = styled.div`
  position: absolute;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  cursor: pointer;
`;

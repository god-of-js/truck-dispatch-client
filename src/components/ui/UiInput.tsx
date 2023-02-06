import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';
import UiIcon from './UiIcon';
import UiField from './UiField';

interface Props {
  label: string;
  type?: 'text' | 'password' | 'number' | 'phone' | 'date';
  value: string | null | number;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  onChange: (event: { name: string; value: string | null }) => void;
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

  function sendPhone(value: string | null | undefined) {
    onChange({ name, value: value || null });
  }

  function handlePasswordTypeToText() {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  }

  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <UiField label={label} name={name} error={error}>
      <InputContainer>
        {inputType === 'phone' ? (
          <PhoneInput
            value={`${value}` || ''}
            country="NG"
            className={'global-input'}
            placeholder="e.g: 08034283438"
            onChange={(e) => sendPhone(e)}
          />
        ) : (
          <Input
            type={inputType}
            value={value || ''}
            name={name}
            hasError={!!error}
            onChange={sendValue}
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
  padding: ${pxToRem(16)} ${pxToRem(8)};
  height: var(--base-height);
  gap: ${pxToRem(8)};
  width: 100%;
  font-size: ${pxToRem(12)};
  border: ${pxToRem(1)} solid;
  border-color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray-200)'};
  background: #ffffff;
  outline: none;
  border-radius: ${pxToRem(4)};
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
  padding: 0 ${pxToRem(8)};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  cursor: pointer;
`;

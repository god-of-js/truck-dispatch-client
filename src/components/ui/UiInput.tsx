import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';
import UiIcon from './UiIcon';

interface Props {
  label: string;
  type?: 'text' | 'password' | 'number' | 'phone';
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UiInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
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
    <div>
      <Label>{label}</Label>
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
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}

        {type === 'password' && (
          <IconButton onClick={handlePasswordTypeToText}>
            <UiIcon name={inputType === 'password' ? 'Eye' : 'EyeSlash'} />
          </IconButton>
        )}
      </InputContainer>
    </div>
  );
}

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: 4px 8px;
  gap: 8px;
  width: 100%;
  height: 40px;
  font-size: 12px;
  border: 1px solid var(--color-gray-200);
  background: #ffffff;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: var(--color-primary);
  }
`;

const Label = styled.label`
  font-size: 12px;
  color: var(--color-gray-500);
  font-weight: bold;
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

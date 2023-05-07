import React, { Ref, useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';
import UiIcon from './UiIcon';
import UiField from './UiField';

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';
interface Props {
  label: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: { name: string; value: string | null }) => void;
}

export default function UiInput({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  disabled,
  error,
  inputRef,
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
    <UiField label={label} error={error}>
      <InputContainer>
        {inputType === 'phone' ? (
          <PhoneInputContainer>
            <div className="phone-tag">+234</div>
            <PhoneInput
              value={`${value}` || ''}
              country="NG"
              className={'global-input'}
              placeholder="e.g: 08034283438"
              onChange={(e) => sendPhone(e)}
            />
          </PhoneInputContainer>
        ) : (
          <Input
            type={inputType}
            value={value || ''}
            placeholder={placeholder}
            name={name}
            ref={inputRef}
            hasError={!!error}
            disabled={disabled}
            onChange={sendValue}
          />
        )}

        {type === 'password' && (
          <IconButton onClick={handlePasswordTypeToText}>
            <UiIcon
              icon={inputType === 'password' ? 'EyeSlash' : 'Eye'}
              size="20"
            />
          </IconButton>
        )}
      </InputContainer>
    </UiField>
  );
}

const PhoneInputContainer = styled.div`
  display: flex;
  .phone-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-gray);
    font-size: ${pxToRem(14)};
    border-radius: ${pxToRem(8)} 0px 0px ${pxToRem(8)};
    padding: ${pxToRem(16)};
  }
`;

const Input = styled.input`
  padding: ${pxToRem(16)};
  height: var(--base-height);
  gap: ${pxToRem(8)};
  width: 100%;
  font-size: ${pxToRem(14)};
  font-family: 'thiccboi-medium';
  border: ${pxToRem(1)} solid;
  border-color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
  background: #ffffff;
  outline: none;
  border-radius: ${pxToRem(8)};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:focus {
    border: ${pxToRem(2)} solid var(--color-primary);
    box-shadow: var(--box-shadow-primary);
  }
  ::placeholder {
    font-size: ${pxToRem(14)};
    color: var(--color-gray-80);
    font-weight: 400;
    line-height: ${pxToRem(24)};
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
  right: ${pxToRem(14)};
  top: 0;
  cursor: pointer;
`;

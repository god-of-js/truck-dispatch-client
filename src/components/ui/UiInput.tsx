import React, { lazy, useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';
import { Icons } from './UiIcon';
const UiField = lazy(() => import('./UiField'));
const UiIcon = lazy(() => import('./UiIcon'));

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';
type Sizes = 'large' | 'md' | 's' | 'text';
export type OnChangeParams = { name: string; value: string | null };
interface Props {
  label?: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: string;
  size?: Sizes;
  icon?: Icons;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}

export default function UiInput({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  size = 'large',
  icon,
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
      <InputContainer hasIcon={!!icon}>
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
          <div className="input-wrapper">
            {!!icon && <UiIcon icon={icon} size="20" />}
            <Input
              type={inputType}
              value={value || ''}
              placeholder={placeholder}
              name={name}
              ref={inputRef}
              hasError={!!error}
              size={size}
              disabled={disabled}
              onChange={sendValue}
            />
          </div>
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

interface InputContainerProps {
  hasIcon: boolean;
}
function iconVariant(icon: boolean) {
  if (icon) {
    return `
    .input-wrapper{
      position: relative;
      input {
        padding-left:44px;
      }
      svg {
        position: absolute;
        height: 100%;
        left:14px;
        top: 0;
      }
    }
    `;
  }
}

const PhoneInputContainer = styled.div`
  display: flex;
  .phone-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-gray);
    font-size: 14px;
    border-radius: 8px 0px 0px 8px;
    padding: 16px;
  }
`;

interface InputProps {
  hasError: boolean;
  size: Sizes;
}
// TODO: replace any with InputProps.
const Input = styled.input<any>`
  padding: 16px;
  height: ${({ size }) =>
    `var(--base-height${['large', 'text'].includes(size) ? '' : `-${size}`})`};
  gap: 8px;
  width: 100%;
  font-size: 14px;
  font-family: 'thiccboi-medium';
  border: 1px solid;
  border-color: ${({ hasError }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
  background: transparent;
  outline: none;
  border-radius: 8px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:focus {
    border: 2px solid var(--color-primary);
    box-shadow: var(--box-shadow-primary);
  }
  ::placeholder {
    font-size: 14px;
    color: var(--color-gray-80);
    font-weight: 400;
    line-height: 24px;
  }
`;

const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  ${({ hasIcon }) => iconVariant(!!hasIcon)};
`;

const IconButton = styled.div`
  position: absolute;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 14px;
  top: 0;
  cursor: pointer;
`;

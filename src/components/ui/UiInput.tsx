import React, { lazy, useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';
import { NumericFormat } from 'react-number-format';
import { Icons } from './UiIcon';
import { Size } from 'types/Size';
const UiField = lazy(() => import('./UiField'));
const UiIcon = lazy(() => import('./UiIcon'));

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';
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
  size?: Size;
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

  function sendValue(e: { target: { name: string; value: any } }) {
    let parsedValue: string | null;

    if (typeof e.target.value === 'string' && type === 'number') {
      const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
      parsedValue = sanitizedValue || null;
    } else {
      parsedValue = e.target.value;
    }

    onChange({ name: e.target.name, value: parsedValue });
    console.log(value);
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
        ) : type === 'number' ? (
          <StyledNumericFormat
            thousandSeparator=","
            value={(value as number) || ''}
            placeholder={placeholder}
            name={name}
            onChange={(value: any) => sendValue(value)}
          />
        ) : (
          <div className="input-wrapper">
            {!!icon && <UiIcon icon={icon} size="20" />}
            <Input
              type={inputType}
              value={(value as string) || ''}
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
        padding-left: ${pxToRem(44)};
      }
      svg {
        position: absolute;
        height: 100%;
        left: ${pxToRem(14)};
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
    font-size: ${pxToRem(14)};
    border-radius: ${pxToRem(8)} 0px 0px ${pxToRem(8)};
    padding: ${pxToRem(16)};
  }
`;

// TODO: replace any with InputProps.
const Input = styled.input<any>`
  padding: ${pxToRem(16)};
  height: ${({ size }) =>
    `var(--base-height${['large', 'text'].includes(size) ? '' : `-${size}`})`};
  gap: ${pxToRem(8)};
  width: 100%;
  font-size: ${pxToRem(14)};
  font-family: 'thiccboi-medium';
  border: ${pxToRem(1)} solid;
  border-color: ${({ hasError }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
  background: transparent;
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

const StyledNumericFormat = styled(NumericFormat)<{
  hasError?: boolean;
}>`
  // Define your styles here to match the input style
  padding: ${pxToRem(16)};
  height: ${({ size }) =>
    size ? `var(--base-height-${size})` : 'var(--base-height)'};
  width: 100%;
  font-size: ${pxToRem(14)};
  border: ${pxToRem(1)} solid;
  border-color: var(--color-gray);
  background: transparent;
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

const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  ${({ hasIcon }) => iconVariant(!!hasIcon)};
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

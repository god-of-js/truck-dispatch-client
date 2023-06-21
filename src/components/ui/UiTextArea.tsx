import React, { lazy } from 'react';
import styled from 'styled-components';

const UiField = lazy(() => import('./UiField'));
interface Props {
  label: string;
  value: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  placeholder?: string;
  error?: string;
  onChange: (event: { name: string; value: string }) => void;
}
export default function UiTextArea({
  label,
  name,
  value,
  error,
  placeholder,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }
  return (
    <UiField label={label} error={error}>
      <TextArea
        value={value || ''}
        name={name}
        hasError={!!error}
        placeholder={placeholder}
        onChange={sendValue}
      />
    </UiField>
  );
}

const TextArea = styled.textarea`
  resize: none;
  
  width: 100%;
  padding: ${pxToRem(16)} ${pxToRem(8)};
  gap: ${pxToRem(8)};
  width: 100%;
  font-size: ${pxToRem(12)};
  border: ${pxToRem(1)} solid;
  border-color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
  outline: none;
  border-radius: ${pxToRem(4)};
  box-sizing: border-box;
  font-family: 'thiccboi-medium', sans-serif;
  min-height: ${pxToRem(200)};
  background: transparent;
  &:focus {
    border: ${pxToRem(2)} solid var(--color-primary);
    box-shadow: var(--box-shadow-primary);
  }
`;

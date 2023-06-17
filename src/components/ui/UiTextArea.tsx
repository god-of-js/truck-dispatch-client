import React from 'react';
import styled from 'styled-components';
import UiField from './UiField';

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
  width: 100%;
  padding:16px 8px;
  gap: 8px;
  width: 100%;
  font-size:12px;
  border: 1px solid;
  border-color: ${({ hasError }: { hasError: boolean }) =>
    hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
  outline: none;
  border-radius:4px;
  box-sizing: border-box;
  font-family: 'thiccboi-medium', sans-serif;
  min-height:200px;
  background: transparent;
  &:focus {
    border:2px solid var(--color-primary);
    box-shadow: var(--box-shadow-primary);
  }
`;

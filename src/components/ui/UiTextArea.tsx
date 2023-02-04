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
  error?: string;
  onChange: (event: { name: string; value: string | null }) => void;
}
export default function UiTextArea({
  label,
  name,
  value,
  error,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }
  return (
    <UiField label={label} name={name} error={error}>
      <TextArea
        value={value || ''}
        name={name}
        hasError={!!error}
        onChange={sendValue}
      />
    </UiField>
  );
}

const TextArea = styled.textarea`
  width: 100%;
  padding: ${pxToRem(16)} ${pxToRem(8)};
  height: ${pxToRem(144)};
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
`;

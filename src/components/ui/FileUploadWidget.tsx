import React from 'react';
import styled from 'styled-components';
import UiField from './UiField';

interface Props {
  name: string;
  label?: string;
  value: File[] | File | null;
  acceptMultiple?: boolean;
  onChange: (event: { name: string; value: File | File[] }) => void;
  children?: React.ReactNode;
  error?: string;
}

export default function FileUploadWidget({
  acceptMultiple,
  children,
  label,
  value,
  name,
  error,
  onChange,
}: Props) {
  const displayComponent = children || defaultComponent();

  function pickImages() {
    document.getElementById('input')?.click();
  }

  function handleFileChange() {
    const fileInput = document.getElementById(
      'input',
    ) as HTMLInputElement | null;
    const selectedFiles = fileInput?.files ? fileInput.files : null;
    if (!selectedFiles) return;
    if (!acceptMultiple) {
      onChange({ name, value: selectedFiles[0] });
      return;
    }

    const dataToSend = {
      name,
      value: [...selectedFiles],
    };
    if (Array.isArray(value)) {
      dataToSend.value.unshift(...value);
    }
    onChange(dataToSend);
  }

  function getFileName(item: File) {
    return item?.name || '';
  }
  function defaultComponent() {
    return (
      <DefaultUploadTrigger>
        <span>Choose file{acceptMultiple ? 's' : ''}</span>
        {!acceptMultiple ? <div>{getFileName(value as File)}</div> : ''}
      </DefaultUploadTrigger>
    );
  }

  return (
    <UiField name={name} label={label} error={error}>
      <FileUploadWidgetStyle onClick={pickImages}>
        <input
          id="input"
          type="file"
          onChange={handleFileChange}
          multiple={acceptMultiple}
          accept="image/*"
        />
        {displayComponent}
      </FileUploadWidgetStyle>
    </UiField>
  );
}

const FileUploadWidgetStyle = styled.div`
  input {
    display: none;
  }
`;

const DefaultUploadTrigger = styled.div`
  background: var(--color-gray-100);
  border: ${pxToRem(1)} dashed var(--color-gray-200);
  font-size: ${pxToRem(14)};
  padding: ${pxToRem(16)};
  text-align: center;
  color: var(--color-gray-500);
  border-radius: ${pxToRem(4)};
  cursor: pointer;
`;

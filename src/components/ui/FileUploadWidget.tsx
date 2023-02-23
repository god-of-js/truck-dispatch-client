import React, { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import UiField from './UiField';

interface Props {
  name: string;
  label?: string;
  value: File[] | File | null;
  acceptMultiple?: boolean;
  fileType?: 'image' | 'document' | 'video';
  onChange: (event: { name: string; value: File | File[] }) => void;
  children?: React.ReactNode;
  error?: string;
}

export default function FileUploadWidget({
  acceptMultiple,
  fileType = 'image',
  children,
  label,
  value,
  name,
  error,
  onChange,
}: Props) {
  const displayComponent = children || defaultComponent();
  const fileTypeSelector = {
    image: 'image/*',
    document:
      'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/rtf, text/plain',
    video: 'video/mp4,video/x-m4v,video/*',
  };

  const inputRef = useRef<HTMLInputElement>(null);

  function pickImages() {
    inputRef.current?.click();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement | null;
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
        <span>
          Choose file{acceptMultiple ? 's' : ''} {name}
        </span>
        {!acceptMultiple ? <div>{getFileName(value as File)}</div> : ''}
      </DefaultUploadTrigger>
    );
  }

  return (
    <UiField name={name} label={label} error={error}>
      <FileUploadWidgetStyle onClick={pickImages}>
        <input
          id={name}
          type="file"
          name={name}
          ref={inputRef}
          onChange={(e) => handleFileChange(e)}
          multiple={acceptMultiple}
          accept={fileTypeSelector[fileType]}
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

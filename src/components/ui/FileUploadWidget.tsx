import React, {
  ChangeEvent,
  JSXElementConstructor,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import UiButton from './UiButton';
import UiField from './UiField';
import UiIcon from './UiIcon';

interface Props {
  name: string;
  label?: string;
  value: File[] | File | string | null;
  acceptMultiple?: boolean;
  fileType?: 'image' | 'document' | 'video';
  onChange: (event: { name: string; value: File | File[] }) => void;
  children?: React.ReactNode;
  error?: string;
  styleType?: 'field' | 'with-drag-and-drop';
}

export default function FileUploadWidget({
  acceptMultiple,
  fileType = 'image',
  children,
  styleType = 'field',
  label,
  value,
  name,
  error,
  onChange,
}: Props) {
  const displayComponent = children || defaultComponent();
  const fileTypeSelector = {
    image: 'image/*',
    document: 'application/pdf',
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

  function getFileName(item: File | string | File[]) {
    if (item instanceof File) {
      return item.name;
    } else if (Array.isArray(item)) {
      // Handle array files later when needed
      return;
    }

    return item?.split('/').pop() || '';
  }

  function defaultComponent() {
    if (styleType === 'with-drag-and-drop') {
      return (
        <WithDragAndDropStyle hasContent={!!value}>
            <div className="content">
              <div className="drag-and-drop-text">
                Drag and drop file inside here
              </div>
              <div className="or-container">
                <div className="dash" />
                <span>OR</span>
                <div className="dash" />
              </div>
              <UiButton variant="secondary" size="s" textCasing="capitalize">
                Browse Files
              </UiButton>
            </div>
        </WithDragAndDropStyle>
      );
    }

    return (
      <FieldUploadStyle>
        {value && !acceptMultiple ? (
          <div>{getFileName(value)}</div>
        ) : (
          <span>Choose file</span>
        )}
        <span className="upload-tag">
          <UiIcon icon="DocumentUpload" size="24" />
        </span>
      </FieldUploadStyle>
    );
  }

  return (
    <UiField label={label} error={error}>
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
  display: flex;
  & > div {
    width: 100%;
  }
`;

const FieldUploadStyle = styled.div`
  border: ${pxToRem(1)} solid var(--color-gray);
  position: relative;
  font-size: ${pxToRem(14)};
  font-family: 'thiccboi-medium';
  height: var(--base-height);
  padding: 0 ${pxToRem(16)};
  color: var(--color-gray-80);
  border-radius: ${pxToRem(8)};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--color-neutralBlack);
  font-size: ${pxToRem(14)};
  line-height: ${pxToRem(24)};
  .upload-tag {
    width: 8.5%;
    display: flex;
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    border-radius: 0px ${pxToRem(8)} ${pxToRem(8)} 0px;
    padding: ${pxToRem(16)};
    border-left: none;
    background-color: var(--color-primary-10);

    svg {
      fill: var(--color-primary);
    }
  }
`;

const WithDragAndDropStyle = styled.div`
  background: var(--color-gray-20);
  box-sizing: border-box;
  border-radius: ${pxToRem(8)};
  padding: ${pxToRem(24)};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${({ hasContent }: { hasContent: boolean }) =>
    !hasContent &&
    `
  border: ${pxToRem(1)} dashed var(--color-gray-80);
  &:hover {
    background: var(--color-primary-10);
    border: ${pxToRem(1)} solid var(--color-primary);
  }
  `}

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: ${pxToRem(104)};
    gap: ${pxToRem(8)};
  }

  .drag-and-drop-text {
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(14)};
    font-weight: 400;
    font-family: 'thiccboi-regular';
    text-align: center;
  }
  .or-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${pxToRem(4)};

    .dash {
      width: ${pxToRem(16)};
      display: block;
      border-top: ${pxToRem(1)} solid var(--color-gray-80);
      padding-top: ${pxToRem(0.5)};
    }

    span {
      font-size: ${pxToRem(12)};
      color: var(--color-gray-80);
      font-weight: 400;
      font-family: 'thiccboi-regular';
    }
  }
`;

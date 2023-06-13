import React, {
  ChangeEvent,
  useEffect,
  useMemo,
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
  const fileTypeSelector = {
    image: 'image/*',
    document: 'application/pdf',
    video: 'video/mp4,video/x-m4v,video/*',
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<File | File[] | null | string>(null);

  function pickImages() {
    inputRef.current?.click();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement | null;
    const selectedFiles = fileInput?.files ? fileInput.files : null;

    if (!selectedFiles) return;
    if (!acceptMultiple) return onChange({ name, value: selectedFiles[0] });

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

  function readFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let fileUrl: string | null = null;
    return new Promise((resolve) => {
      reader.onload = () => {
        fileUrl = reader.result as string;
        resolve(reader.result);
      };
    }).then(() => {
      return (fileUrl as string) || null;
    });
  }

  function withDragAndDrop() {
    return (
      <WithDragAndDropStyle
        hasContent={!!fileUrl}
        className="drag-and-drop-container"
      >
        {fileUrl ? (
          <>
            <p>{getFileName(name)}</p>
            <div className="reselect-file">
              <UiIcon icon="Refresh" size="32" />
            </div>
          </>
        ) : (
          <div className="content">
            {value && <div className="file-name">{getFileName(value)}</div>}
            <div className="drag-and-drop-text">
              {value
                ? 'Drag and drop file inside here to change file'
                : 'Drag and drop file inside here'}
            </div>
            <div className="or-container">
              <div className="dash" />
              <span>OR</span>
              <div className="dash" />
            </div>
            <UiButton
              variant="secondary"
              size="s"
              type="button"
              textCasing="capitalize"
            >
              Browse Files
            </UiButton>
          </div>
        )}
      </WithDragAndDropStyle>
    );
  }

  const defaultComponent = useMemo(() => {
    if (styleType === 'with-drag-and-drop') {
      return withDragAndDrop();
    }
    return (
      <FieldUploadStyle>
        {value && !acceptMultiple ? (
          <div className="file-name">{getFileName(value)}</div>
        ) : (
          <span>Choose file</span>
        )}
        <span className="upload-tag">
          <UiIcon icon="DocumentUpload" size="24" />
        </span>
      </FieldUploadStyle>
    );
  }, [fileUrl, value, name]);

  useEffect(() => {
    if (value instanceof File && fileType === 'image') {
      (async () => {
        const file = await readFile(value);
        if (file) setFileUrl(file);
      })();
    } else if (typeof value === 'string') {
      setFileUrl(value);
    }
  }, [value]);

  return (
    <UiField label={label} error={error}>
      <FileUploadWidgetStyle
        onClick={pickImages}
        className="file-upload-widget"
      >
        <input
          id={name}
          type="file"
          name={name}
          ref={inputRef}
          onChange={(e) => handleFileChange(e)}
          multiple={acceptMultiple}
          accept={fileTypeSelector[fileType]}
        />
        {children || defaultComponent}
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

  .file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
  }
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

interface WithDragAndDropProps {
  hasContent: boolean;
}
const WithDragAndDropStyle = styled.div<WithDragAndDropProps>`
  position: relative;
  background-color: var(--color-gray-20);
  box-sizing: border-box;
  border-radius: ${pxToRem(8)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  ${({ hasContent }) =>
    !hasContent &&
    `
  padding: ${pxToRem(24)};
  border: ${pxToRem(1)} dashed var(--color-gray-80);
  &:hover {
    background: var(--color-primary-10);
    border: ${pxToRem(1)} solid var(--color-primary);
  }
  `}

  .reselect-file {
    display: none;
  }
  &:hover {
    .reselect-file {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        0deg,
        rgba(21, 19, 27, 0.5),
        rgba(21, 19, 27, 0.5)
      );
      border-radius: ${pxToRem(8)};

      svg {
        fill: #fff;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${pxToRem(8)};
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 30%;
    gap: ${pxToRem(8)};
    height: 320px;
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

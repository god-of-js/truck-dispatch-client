import React, { lazy } from 'react';
import 'react-quill/dist/quill.snow.css';
const UiField = lazy(() => import('./UiField'));
const LazyLoadedQuill = lazy(() => import('react-quill'));
import { ReactQuillProps } from 'react-quill';

interface Props {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  error?: string;
  onChange: (event: { name: string; value: string }) => void;
}

export default function UiRichTextArea({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
}: Props) {
  const handleEditorChange = (content: string) => {
    onChange({ name, value: content });
  };

  const customStyles: ReactQuillProps['style'] = {
    // padding: '16px, 24px',
    gap: '8px',
    width: '100%',
    fontSize: '12px',
    border: '1px solid',
    borderColor: 'var(--color-gray)',
    outline: 'none',
    borderRadius: '4px',

    overflowX: 'scroll',
    overflowY: 'scroll',
    overflow: 'hidden',

    fontFamily: 'thiccboi-medium, sans-serif',
    background: 'transparent',
    resize: 'none',
    height: '200px',
    minHeight: '200px !important',
  };

  return (
    <UiField label={label} error={error}>
      <LazyLoadedQuill
        theme="snow"
        value={value || ''}
        onChange={handleEditorChange}
        placeholder={placeholder}
        style={customStyles}
      />
    </UiField>
  );
}

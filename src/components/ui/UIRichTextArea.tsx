import React, { lazy } from 'react';
import 'react-quill/dist/quill.snow.css';
const UiField = lazy(() => import('./UiField'));
const LazyLoadedQuill = lazy(() => import('react-quill'));

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

  return (
    <UiField label={label} error={error}>
      <LazyLoadedQuill
        theme="snow"
        value={value || ''}
        onChange={handleEditorChange}
        placeholder={placeholder}
      />
    </UiField>
  );
}

import React from 'react';
import { Formik } from 'formik';

interface Props {
  rules: Record<string, unknown[]>;
  formData: Record<string, any>;
  onSubmit: () => void;
}

export default function UiForm({ rules, formData, onSubmit }: Props) {
  function validateForm() {
    const errors = {};
    
  }

  function handleSubmit() {}

  return (
    <Formik
      initialValues={formData}
      validate={validateForm}
      onSubmit={handleSubmit}
    >

    </Formik>
  );
}

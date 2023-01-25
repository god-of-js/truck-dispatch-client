import React from 'react';
import { Formik } from 'formik';

const ruleCheck = {
  required: true,
}

interface Props {
  rules: Record<string, string[]>;
  formData: Record<string, any>;
  children?: React.ReactNode;
  onSubmit: () => void;
}

export default function UiForm({ rules, formData, children, onSubmit }: Props) {
  function validateForm(values: Record<string, string>) {
    const errors: Record<string, string> = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  function handleSubmit() { }

  return (
    <Formik
      initialValues={formData}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => <form>{children}</form>}
    </Formik>
  );
}

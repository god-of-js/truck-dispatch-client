import React from 'react';
import { Formik } from 'formik';

const ruleCheck = {
  required: true,
  email: (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
};

interface Props {
  rules: Record<string, string[]>;
  formData: Record<string, any>;
  children: (props: {
    errors: Record<string, string | undefined>,
    hasErrors: boolean,
    isSubmitting: boolean;
  }) => React.ReactNode;
  onSubmit: () => void;
}

export default function UiForm({ rules, formData, children, onSubmit }: Props) {
  function validateForm(values: Record<string, string>) {
    console.log('it gets here')
    const errors: Record<string, string> = {};
    const dataKeys = Object.keys(formData);
    dataKeys.forEach((key: string) => {
      rules[key].forEach((rule) => {
        console.log(rule);
      })
    })
    return errors;
  }

  function handleSubmit() {}

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
      }) => <form>{children({
        errors,
        hasErrors: !!errors.length,
        isSubmitting
      })}</form>}
    </Formik>
  );
}

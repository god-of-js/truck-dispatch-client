import { Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';

export type RuleType =
  | 'required'
  | `required.if.${'typeOfGoods.is.container'}`
  | 'email'
  | 'password'
  | `sameas.${'password'}`
  | `min.${8 | 6}`;
const ruleCheck = {
  email: (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
};

interface Props {
  /** These rules are used for validations. */
  rules?: Record<string, RuleType[]>;
  formData: Record<string, any>;
  children: (props: {
    errors: FormikErrors<Record<string, string>>;
    hasErrors?: boolean;
    isSubmitting?: boolean;
  }) => React.ReactNode;
  onSubmit: () => void;
}

export default function UiForm({ rules, formData, children, onSubmit }: Props) {
  function validateForm() {
    try {
      const errors: FormikErrors<Record<string, string>> = {};
      const dataKeys = Object.keys(formData);
      dataKeys.forEach((key: string) => {
        // @ts-ignore
        rules[key] &&
          // @ts-ignore
          rules[key].forEach((rule) => {
            if (rule === 'required' && !formData[key]) {
              errors[key] = 'This field is required';
              return;
            }

            if (
              rule === 'email' &&
              formData[key] &&
              !ruleCheck.email(formData[key])
            ) {
              errors[key] = 'Invalid email format';
              return;
            }

            if (rule.includes('sameas.')) {
              const lookAlikesKey = rule.split('.')[1];
              if (formData[key] !== formData[lookAlikesKey]) {
                errors[key] = `This field must match ${lookAlikesKey}`;
                return;
              }
            }
            if (rule.includes('min.')) {
              const minNumber = parseInt(rule.split('.')[1] || '0');
              if (formData[key].length < minNumber) {
                errors[
                  key
                ] = `This field must have above ${minNumber} characters`;
                return;
              }
            }
            if (rule.includes('required.if.')) {
              const splits = rule.split('.');
              const variableKey = splits[2];

              if (splits.length > 4) {
                // check if 
              }
              if (splits[3] === 'is' && formData[variableKey] && !formData[key]) {
                // check if it's required only if one variable is available
                errors[
                  key
                ] = `This field is required if ${variableKey} is selected`;
                return;
              } 
            }
          });
      });
      return errors;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Formik
      initialValues={formData}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          {children({
            errors,
            hasErrors: !!errors.length,
            isSubmitting,
          })}
        </form>
      )}
    </Formik>
  );
}

import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import TransporterValidationSchema from 'utils/validations/TransporterValidationSchema';

import Verification from 'types/Verification';
import sizes from 'utils/sizes';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import UiIcon from 'ui/UiIcon';

const UiLocationsInput = lazy(() => import('ui/UiLocationsInput'));
const FileUploadWidget = lazy(() => import('ui/FileUploadWidget'));
const UiSelect = lazy(() => import('ui/UiSelect'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  verification: Verification;
  goToNext: (verificationData: Partial<Verification>) => void;
}

export default function IdentificationDetailsForm({
  verification,
  goToNext,
}: Props) {
  const [formData, setFormData] = useState(verification);

  const idTypeOptions = [
    {
      label: 'National Identification Card(NIN)',
      value: 'nin',
    },
    {
      label: 'International Passport',
      value: 'international-passport',
    },
    {
      label: "Voter's Card",
      value: 'voter-card',
    },
    {
      label: 'Driver License',
      value: 'driver-license',
    },
  ];

  function setData(event: {
    name: string;
    value: string | File | File[] | null;
  }) {
    setFormData((state) => ({
      ...state,
      [event.name]: event.value,
    }));
  }

  function goToNextStep() {
    goToNext(formData);
  }

  return (
    <div className="form-container">
      <header>
        <UiIcon icon="UserOctagon" size="45" />
        <h1>Account Verification</h1>
        <p>
          To verify your account, please enter accurate information in the
          provided input box.
        </p>
      </header>
      <UiForm
        formData={formData}
        schema={TransporterValidationSchema}
        onSubmit={goToNextStep}
      >
        {({ errors }) => (
          <div className="form-container__inner">
            <UiSelect
              label="Identification Document Type"
              options={idTypeOptions}
              name="idType"
              error={errors.idType}
              value={`${formData.idType}`}
              onChange={setData}
            />
            <FileUploadWidget
              label="Identification Document"
              name="idDoc"
              value={formData.idDoc as File}
              error={errors.idDoc}
              onChange={setData}
            />
            <UiButton isFullWidth size="large" variant="primary">
              Continue
            </UiButton>
          </div>
        )}
      </UiForm>
    </div>
  );
}

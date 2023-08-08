import React, { lazy, useState } from 'react';
import Verification from 'types/Verification';
import IdentificationDetailsFormSchema from 'utils/validations/IdentificationDetailsFormSchema';

const FileUploadWidget = lazy(() => import('ui/FileUploadWidget'));
const UiSelect = lazy(() => import('ui/UiSelect'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  verification: Verification;
  loading: boolean;
  goToNext: (verificationData: Partial<Verification>) => void;
}
export default function IdentificationDetailsForm({
  verification,
  loading,
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
    <UiForm
      formData={formData}
      schema={IdentificationDetailsFormSchema}
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
          <UiButton isFullWidth size="large" loading={loading} variant="primary">
            Continue
          </UiButton>
        </div>
      )}
    </UiForm>
  );
}

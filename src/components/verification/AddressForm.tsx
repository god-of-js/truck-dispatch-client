import React, { lazy, useState } from 'react';
import { useDispatch } from 'react-redux';

import Verification from 'types/Verification';
import AdressFormSchema from 'utils/validations/AdressFormSchema';

const UiLocationsInput = lazy(() => import('ui/UiLocationsInput'));
const FileUploadWidget = lazy(() => import('ui/FileUploadWidget'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  verification: Verification;
  goToNext: (verificationData: Partial<Verification>) => void;
}

export default function IdentificationDetailsForm({
  verification,
  goToNext,
}: Props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(verification);

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
      schema={AdressFormSchema}
      onSubmit={goToNextStep}
    >
      {({ errors }) => (
        <div className="form-container__inner">
          <UiLocationsInput
            label="Home Address"
            name="homeAddress"
            value={formData.homeAddress}
            error={errors.homeAddress}
            onChange={setData}
          />
          <FileUploadWidget
            label="Utility bill of Home address"
            name="homeUtilityBill"
            value={formData.homeUtilityBill as File}
            error={errors.homeUtilityBill}
            onChange={setData}
          />
          <UiLocationsInput
            label="Office Address"
            name="officeAddress"
            value={formData.officeAddress}
            error={errors.officeAddress}
            onChange={setData}
          />
          <UiLocationsInput
            label="Garage Address"
            name="garageAddress"
            value={formData.garageAddress}
            error={errors.garageAddress}
            onChange={setData}
          />
          <div>
            <UiButton isFullWidth size="large" variant="primary">
              Continue
            </UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}

import React, { useState } from 'react';
import styled from 'styled-components';

import UiForm, { RuleType } from 'ui/UiForm';
import UiSelect from 'ui/UiSelect';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiButton from 'ui/UiButton';
interface FormData {
  idType: string;
  idDoc: File | null;
  homeAddress: string;
}
export default function VerificationForm() {
  const [formData, setFormData] = useState<FormData>({
    idType: '',
    idDoc: null,
    homeAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const formRules: Record<string, RuleType[]> = {
    idType: ['required'],
    idDoc: ['required'],
    homeAddress: ['required'],
  };
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

  function verifyUser() {
    setLoading(true);
    console.log(formData);
  }

  function setData(event: {
    name: string;
    value: string | null | File | File[];
  }) {
    //   Fix idType reset
    console.log({
        ...formData,
        [event.name]: event.value,
      }, event.name, event.value)
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  return (
    <UiForm formData={formData} rules={formRules} onSubmit={verifyUser}>
      {({ errors }) => (
        <Gap>
          <UiSelect
            label="Identification Document Type"
            options={idTypeOptions}
            name="idType"
            error={errors.idType}
            value={formData.idType}
            onChange={setData}
          />
          <FileUploadWidget
            label="Identification Document"
            name="idDoc"
            value={formData.idDoc}
            error={errors.idDoc}
            onChange={setData}
          />

          <UiLocationsInput
            label="Home Address"
            name="homeAddress"
            value={formData.homeAddress}
            error={errors.homeAddress}
            onChange={setData}
          />
          <UiButton loading={loading}>Submit Verification Details</UiButton>
        </Gap>
      )}
    </UiForm>
  );
}

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(16)};
`;

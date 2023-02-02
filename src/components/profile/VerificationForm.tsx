import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import styled from 'styled-components';

import UiForm, { RuleType } from 'ui/UiForm';
import UiSelect from 'ui/UiSelect';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiButton from 'ui/UiButton';
import { sendVerificationDetailsToAdmin } from '../../modules/Account';
import VerificationFormData from '../../types/VerificationFormData';
import { uploadItem } from '../../api/Cloudinary';

export default function VerificationForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<VerificationFormData>({
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

  async function verifyUser() {
    setLoading(true);
    const idDocUrl = await uploadItem(formData.idDoc as File);
    setFormData({
      ...formData,
      idDoc: idDocUrl,
    })
    console.log(formData);
    dispatch(sendVerificationDetailsToAdmin(formData) as unknown as AnyAction)
      .then(() => {
        console.log('success');
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  const formDataAddressKey = useMemo(
    () =>
      JSON.stringify({
        idType: formData.idType,
        idDoc: formData.idDoc,
      }),
    [
      {
        idType: formData.idType,
        idDoc: formData.idDoc,
      },
    ],
  );

  function setData(event: { name: string; value: string | File | File[] }) {
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
          <UiLocationsInput
            label="Home Address"
            name="homeAddress"
            key={formDataAddressKey}
            formData={formData}
            error={errors.homeAddress}
            onChange={(e) => setFormData(e as VerificationFormData)}
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

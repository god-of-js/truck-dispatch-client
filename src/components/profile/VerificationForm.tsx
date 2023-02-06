import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { uploadItem } from '../../api/Cloudinary';
import { RootState } from '../../modules';
import { sendVerificationDetailsToAdmin } from 'modules/Account';
import { toAnyAction } from 'utils/helpers';
import TransporterValidationSchema from 'utils/validations/TransporterValidationSchema';


import UiForm from 'ui/UiForm';
import UiSelect from 'ui/UiSelect';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiButton from 'ui/UiButton';
import VerificationFormData from 'types/VerificationFormData';

interface Props {
  onVerified: () => void;
}
export default function VerificationForm({ onVerified = () => {} }: Props) {
  const user = useSelector((state: RootState) => state.account.user);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState<VerificationFormData>({
    idType: '',
    idDoc: null,
    homeAddress: '',
    userId: '',
  });

  const [loading, setLoading] = useState(false);
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

    if (!user?.id) return;

    dispatch(
      toAnyAction(
        sendVerificationDetailsToAdmin({
          ...formData,
          idDoc: idDocUrl,
          userId: user?.id,
        }),
      ),
    )
      .then(() => {
        onVerified();
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function setData(event: { name: string; value: string | File | File[] }) {
    setFormData((state) => ({
      ...state,
      [event.name]: event.value,
    }));
  }

  return (
    <UiForm formData={formData} schema={TransporterValidationSchema} onSubmit={verifyUser}>
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

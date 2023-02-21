import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { uploadItem } from '../../api/Cloudinary';
import {
  selectDashboardUser,
  sendVerificationDetailsToAdmin,
} from 'modules/Account';
import { toAnyAction } from 'utils/helpers';
import TransporterValidationSchema from 'utils/validations/TransporterValidationSchema';

import UiForm from 'ui/UiForm';
import UiSelect from 'ui/UiSelect';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiButton from 'ui/UiButton';
import VerificationFormData from 'types/VerificationFormData';
import UiInput from 'ui/UiInput';
import sizes from 'utils/sizes';

interface Props {
  onVerified: () => void;
}

export default function VerificationForm({ onVerified = () => {} }: Props) {
  const user = useSelector(selectDashboardUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<VerificationFormData>({
    idType: '',
    idDoc: null,
    homeAddress: '',
    homeUtilityBill: null,
    userId: '',
    garageAddress: '',
    officeAddress: '',
    guarantor: {
      name: '',
      email: '',
      phone: '',
      homeAddress: '',
      idType: '',
      idDoc: null,
    },
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

  function setData(event: {
    name: string;
    value: string | File | File[] | null;
  }) {
    if (event.name.includes('guarantor')) {
      const fieldName = event.name.split('guarantor.');
      setFormData((state) => ({
        ...state,
        guarantor: {
          ...state.guarantor,
          [fieldName[1]]: event.value,
        },
      }));
    }
    setFormData((state) => ({
      ...state,
      [event.name]: event.value,
    }));
  }

  return (
    <UiForm
      formData={formData}
      schema={TransporterValidationSchema}
      onSubmit={verifyUser}
    >
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
            error={errors.officeAddress}
            onChange={setData}
          />
          <UiLocationsInput
            label="Garage Address"
            name="garageAddress"
            error={errors.garageAddress}
            onChange={setData}
          />
          <Heading>Guarantor Details</Heading>
          <Paragraph>
            A guarantor is a colleague or person who can vouch for you and your
            professionalism.
            <br />
            In situations where we can't reach you or fraudulent situations
            involving you, your guarantor may also be held accountable. <br />{' '}
            <b>
              NOTE: all guarantors are subject to verification. If a guarantors
              details are fake, your application can be automatically rejected
            </b>
          </Paragraph>
          <GapGrid>
            <UiInput
              label="Guarantor Name"
              name="guarantor.name"
              value={formData.guarantor.name}
              error={errors['guarantor.name']}
              onChange={setData}
            />
            <UiInput
              label="Guarantor Email"
              name="guarantor.email"
              value={formData.guarantor.email}
              error={errors['guarantor.email']}
              onChange={setData}
            />
            <UiInput
              label="Guarantor Phone"
              name="guarantor.phone"
              type="phone"
              value={formData.guarantor.phone}
              error={errors['guarantor.phone']}
              onChange={setData}
            />
            <UiLocationsInput
              label="Guarantor Home Address"
              name="guarantor.homeAddress"
              error={errors['guarantor.homeAddress']}
              onChange={setData}
            />
            <UiSelect
              label="Guarantor Identification Document Type"
              options={idTypeOptions}
              name="guarantor.idType"
              error={errors['guarantor.idType']}
              value={`${formData.guarantor.idType}`}
              onChange={setData}
            />
            <FileUploadWidget
              label="Guarantor Identification Document"
              name="guarantor.idDoc"
              value={formData.guarantor.idDoc as File}
              error={errors['guarantor.idDoc']}
              onChange={setData}
            />
          </GapGrid>
          <UiButton isFullWidth loading={loading}>
            Submit Verification Details
          </UiButton>
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

const GapGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${pxToRem(12)};

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;
const Heading = styled.h3`
  margin: 0;
  padding: 0;
  font-size: ${pxToRem(16)};
`;

const Paragraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${pxToRem(14)};
`;

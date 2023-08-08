import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Verification from 'types/Verification';
import UiIcon from 'ui/UiIcon';
import UiAlert from 'ui/UiAlert';
import GuarantorDetailsFormSchema from 'utils/validations/GuarantorDetailsFormSchema';

const UiLocationsInput = lazy(() => import('ui/UiLocationsInput'));
const FileUploadWidget = lazy(() => import('ui/FileUploadWidget'));
const UiSelect = lazy(() => import('ui/UiSelect'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  verification: Verification;
  finish: (verificationData: Partial<Verification>) => void;
  isLoading: boolean;
}

export default function GuarantorsDetailsForm({
  verification,
  finish,
  isLoading,
}: Props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(verification);

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

  function setData(event: {
    name: string;
    value: string | File | File[] | null;
  }) {
    if (event.name.includes('guarantor')) {
      const fieldName = event.name.split('guarantor.')[1];
      setFormData((state) => ({
        ...state,
        guarantor: {
          ...state.guarantor,
          [fieldName]: event.value,
        },
      }));
      return;
    }
  }

  function gotoNextStep() {
    finish(formData);
  }

  return (
    <>
      <div className="form-container">
        <header>
          <UiIcon icon="UserOctagon" size="45" />
          <h1>Account Verification</h1>
          <p>
            To verify your account, please enter accurate information in the
            provided input box.
          </p>
          <GuarantorDetails>
            <div>
              <h3>Guarantor Details</h3>
              <p>
                A guarantor is a colleague or a person who can vouch for you and
                your professionalism. In situations where we can’t reach you or
                fraudulent situations involving you, your guarantor may also be
                held accountable.
              </p>
            </div>
            <UiAlert variant="info" icon={<UiIcon icon="Warning" size="20" />}>
              <div className="alert-warning">
                <div className="alert-header">Note</div>
                <div className="alert-message">
                  All guarantors are subject to verification. If a guarantor
                  details are fake, your application will be automatically
                  rejected.
                </div>
              </div>
            </UiAlert>
          </GuarantorDetails>
        </header>
        <UiForm
          formData={formData}
          schema={GuarantorDetailsFormSchema}
          onSubmit={gotoNextStep}
        >
          {({ errors }) => (
            <div className="form-container__inner">
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
                value={formData.guarantor.homeAddress}
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
              <UiButton
                loading={isLoading}
                isFullWidth
                size="large"
                variant="primary"
              >
                submit verification details
              </UiButton>
            </div>
          )}
        </UiForm>
      </div>
    </>
  );
}

const GuarantorDetails = styled.div`
  display: grid;
  gap: ${pxToRem(32)};
  margin-top: ${pxToRem(32)};

  h3 {
    font-size: 16px;
    line-height: ${pxToRem(24)};
    margin-bottom: ${pxToRem(8)};
  }

  p {
    font-size: ${pxToRem(14)};
    line-height: ${pxToRem(24)};
  }

  .alert-warning {
    text-align: start;
    display: grid;
    gap: ${pxToRem(4)};
    line-height: ${pxToRem(16)};

    .alert-header {
      font-weight: 700;
      color: var(--color-primary);
      font-size: ${pxToRem(14)};
    }

    .alert-message {
      color: var(--color-gray-70);
      font-size: ${pxToRem(12)};
      font-weight: 400;
    }
  }
`;

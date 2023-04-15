import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledAuthScreen } from './PersonalDetailsForm';
import { Margin } from './PersonalDetailsForm';
import Verification from 'types/Verification';

import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiSelect from 'ui/UiSelect';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiAlert from 'ui/UiAlert';
import FileUploadWidget from 'ui/FileUploadWidget';

export default function CompanyDetailsForm() {
  const { userType } = useParams();
  const [formData, setFormData] = useState({
    company_name: '',
    company_location: '',
    company_registered: '',
    CAC_number: '',
  });
  const [doc, setDoc] = useState<{ TDO: null | File }>({ TDO: null });

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function selectFile(param: { name: string; value: File | File[] }) {
    if (!Array.isArray(param.value)) setDoc({ TDO: param.value });
    else setDoc({ TDO: param.value[0] });
  }

  function onSubmit() {}
  const selectOptions = [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ];

  function alternativeUserType() {
    if (userType === 'transport_company') {
      return 'transporter';
    }
    if (userType === 'company') {
      return 'agent';
    }
  }
  function alertMessage() {
    if (userType === 'transport_company') {
      return (
        <>
          a <b>transporter</b>
        </>
      );
    }
    if (userType === 'company') {
      return (
        <>
          an <b>agent</b>
        </>
      );
    }
  }
  return (
    <StyledAuthScreen>
      <div className="header-container">
        <UiIcon icon="Buildings" size="43" />
        <h1>Company Details</h1>
        <p>Please provide the correct company details.</p>
      </div>
      <div className="form-container">
        <UiForm formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <>
              <UiInput
                label="Company Name*"
                placeholder="What is the company name?"
                value={formData.company_name}
                name="company_name"
                onChange={handleChange}
              />
              <Margin />
              <UiInput
                label="Company Location*"
                placeholder="Where is the company located?"
                value={formData.company_location}
                name="company_location"
                onChange={handleChange}
              />
              <Margin />
              <UiSelect
                label="Is your company registered?"
                name="company_registered"
                value={formData.company_registered}
                options={selectOptions}
                onChange={handleChange}
              />
              {formData.company_registered === 'No' && (
                <>
                  <AlertMargin />
                  <UiAlert
                    variant="gray"
                    icon={<UiIcon icon="InfoCircle" size="17" />}
                  >
                    You have to be a registered company to register as a
                    transport company on TruckDispatch. But you can always
                    register as {alertMessage()} now, and upgrade when you have
                    your documents
                  </UiAlert>
                </>
              )}
              {formData.company_registered === 'Yes' && (
                <>
                  <Margin />
                  <UiInput
                    label="CAC Reference Number*"
                    placeholder="ex: RC 193xxxx"
                    value={formData.CAC_number}
                    name="CAC_number"
                    onChange={handleChange}
                  />
                  <Margin />
                  <FileUploadWidget
                    name="TDO"
                    label="Upload CAC Certificate*"
                    fileType="document"
                    value={doc.TDO}
                    onChange={selectFile}
                    error={errors.TDO}
                  />
                </>
              )}
              <UiButton size="large" variant="primary" isFullWidth>
                {formData.company_registered === 'No'
                  ? `Continue as ${alternativeUserType()}`
                  : 'Continue'}
              </UiButton>
            </>
          )}
        </UiForm>
      </div>
    </StyledAuthScreen>
  );
}
const AlertMargin = styled.div`
  margin-bottom: ${pxToRem(8)};
`;

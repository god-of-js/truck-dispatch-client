import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiSelect from 'ui/UiSelect';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiAlert from 'ui/UiAlert';
import FileUploadWidget from 'ui/FileUploadWidget';
import StyledAuthContent from './StyledAuthContent';

interface Props {
  goToNext: () => void;
}
export default function CompanyDetailsForm({ goToNext }: Props) {
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

  function onSubmit() {
    goToNext();
  }

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
    return 'agent';
  }

  function alertMessage() {
    if (userType === 'transport_company') {
      return (
        <>
          a <b>transporter</b>
        </>
      );
    }
    return (
      <>
        an <b>agent</b>
      </>
    );
  }

  return (
    <StyledAuthContent>
      <header>
        <UiIcon icon="Buildings" size="43" />
        <h1>Company Details</h1>
        <p>Please provide the correct company details.</p>
      </header>
      <div className="form-container">
        <UiForm formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <div className="form-container__inner">
              <UiInput
                label="Company Name*"
                placeholder="What is the company name?"
                value={formData.company_name}
                name="company_name"
                onChange={handleChange}
              />
              <UiInput
                label="Company Location*"
                placeholder="Where is the company located?"
                value={formData.company_location}
                name="company_location"
                onChange={handleChange}
              />
              <div className="select-with-optional-alert-container">
                <UiSelect
                  label="Is your company registered?"
                  name="company_registered"
                  value={formData.company_registered}
                  options={selectOptions}
                  onChange={handleChange}
                />

                {formData.company_registered === 'No' && (
                  <UiAlert
                    variant="gray"
                    icon={<UiIcon icon="InfoCircle" size="17" />}
                  >
                    You have to be a registered company to register as a
                    transport company on TruckDispatch. But you can always
                    register as {alertMessage()} now, and upgrade when you have
                    your documents
                  </UiAlert>
                )}
              </div>
              {formData.company_registered === 'Yes' && (
                <>
                  <UiInput
                    label="CAC Reference Number*"
                    placeholder="ex: RC 193xxxx"
                    value={formData.CAC_number}
                    name="CAC_number"
                    onChange={handleChange}
                  />
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
            </div>
          )}
        </UiForm>
      </div>
    </StyledAuthContent>
  );
}

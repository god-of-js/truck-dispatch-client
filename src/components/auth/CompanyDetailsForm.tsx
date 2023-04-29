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
import CompanyVerificationSchema from 'utils/validations/CompanyVerificationSchema';
import { deepRootedToFormData, toAnyAction } from 'utils/helpers';
import { useDispatch } from 'react-redux';
import { sendCompanyUpgradeVerification } from 'modules/Verification';
import UiLocationsInput from 'ui/UiLocationsInput';

interface Props {
  goToNext: (isSkipped?: boolean) => void;
}
export default function CompanyDetailsForm({ goToNext }: Props) {
  const { userType } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    companyName: '',
    companyLocation: '',
    isCompanyRegistered: '',
    cacReference: '',
    cacDocument: null as unknown as File,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData((data) => ({
      ...data,
      [event.name]: event.value,
    }));
  }

  function selectFile(param: { name: string; value: File | File[] }) {
    if (!Array.isArray(param.value)) {
      setFormData((values) => ({
        ...values,
        cacDocument: param.value as File,
      }));
    }
  }

  function submitCompanyVerification() {
    const data = deepRootedToFormData(formData);
    setLoading(true);
    dispatch(toAnyAction(sendCompanyUpgradeVerification(data)))
      .then(() => {
        goToNext();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const selectOptions = [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
  ];

  function alternativeUserType() {
    if (userType === 'transportCompany') {
      return 'a transporter';
    }
    return 'an agent';
  }

  function notRegisteredUsertype() {
    if (userType === 'transportCompany') {
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
      <div className="form-container">
        <header>
          <UiIcon icon="Buildings" size="43" />
          <h1>Company Details</h1>
          <p>Please provide the correct company details.</p>
        </header>
        <UiForm
          formData={formData}
          schema={CompanyVerificationSchema}
          onSubmit={submitCompanyVerification}
        >
          {({ errors }) => (
            <div className="form-container__inner">
              <UiInput
                label="Company Name*"
                placeholder="What is the company name?"
                value={formData.companyName}
                name="companyName"
                error={errors.companyName}
                onChange={handleChange}
              />
              <div className="no-btn-margin-top">
                <UiLocationsInput
                  label="Company Location*"
                  value={formData.companyLocation}
                  error={errors.companyLocation}
                  name="companyLocation"
                  onChange={handleChange}
                />
              </div>
              <div className="select-with-optional-alert-container">
                <UiSelect
                  label="Is your company registered?"
                  name="isCompanyRegistered"
                  value={formData.isCompanyRegistered}
                  options={selectOptions}
                  error={errors.isCompanyRegistered}
                  onChange={handleChange}
                />

                {formData.isCompanyRegistered === 'no' && (
                  <UiAlert
                    variant="gray"
                    icon={<UiIcon icon="InfoCircle" size="17" />}
                  >
                    You have to be a registered company to register as a company
                    on TruckDispatch. But you can always register as{' '}
                    {notRegisteredUsertype()} now, and upgrade when you have
                    your documents
                  </UiAlert>
                )}
              </div>
              {formData.isCompanyRegistered === 'yes' && (
                <>
                  <UiInput
                    label="CAC Reference Number*"
                    placeholder="ex: RC 193xxxx"
                    value={formData.cacReference}
                    name="cacReference"
                    error={errors.cacReference}
                    onChange={handleChange}
                  />
                  <FileUploadWidget
                    name="cacDocument"
                    label="Upload CAC Certificate*"
                    fileType="document"
                    value={formData.cacDocument}
                    error={errors.cacDocument}
                    onChange={selectFile}
                  />
                </>
              )}
              <div>
                <UiButton
                  size="large"
                  variant="primary"
                  isFullWidth
                  loading={loading}
                  disabled={formData.isCompanyRegistered === 'no'}
                >
                  Continue
                </UiButton>
                <UiButton
                  variant="tertiary"
                  size="large"
                  textCasing="normal"
                  isFullWidth
                  type="button"
                  onClick={goToNext}
                >
                  {`Continue as ${alternativeUserType()} instead`}
                </UiButton>
              </div>
            </div>
          )}
        </UiForm>
      </div>
    </StyledAuthContent>
  );
}

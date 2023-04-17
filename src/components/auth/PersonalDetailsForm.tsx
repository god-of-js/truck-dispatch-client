import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiSelect from 'ui/UiSelect';
import { Option } from 'ui/UiSelect';
import UiForm from 'ui/UiForm';

export default function PersonDetailsForm() {
  const { userType } = useParams();
  const isCompany = userType === 'company' || userType === 'transport_company';

  const header = isCompany ? 'Account Handler Details' : 'Personal Details';
  const text = isCompany
    ? 'Please provide your correct details in the input box below as a representative of the company'
    : 'Please provide your correct details in the input box below';
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    company_role: '',
  });
  const selectOptions = [
    {
      label: 'CEO/Owner',
      value: 'CEO/Owner',
    },
    {
      label: 'Accountant',
      value: 'Accountant',
    },
  ];
  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }
  const onSubmit = () => {};

  return (
    <StyledAuthScreen>
      <div className="header-container">
        <UiIcon icon="UserOctagon" size="45" />
        <h1>{header}</h1>
        <p>{text}</p>
      </div>
      <div className="form-container">
        <UiForm formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <>
              <UiInput
                onChange={handleChange}
                value={formData.firstname}
                name="firstname"
                label="First Name*"
                placeholder="Enter your first name"
              />
              <Margin />
              <UiInput
                onChange={handleChange}
                value={formData.lastname}
                name="lastname"
                label="Last Name*"
                placeholder="Enter your last name"
              />
              <Margin />
              <UiInput
                onChange={handleChange}
                value={formData.email}
                name="email"
                label="Email Address*"
                placeholder="Enter your email adress"
              />
              <Margin />
              <UiInput
                label="Phone Number*"
                type="phone"
                value={formData.phone}
                name="phone"
                error={errors.phone}
                onChange={handleChange}
              />
              <Margin />
              {isCompany && (
                <UiSelect
                  label="Role in the Company"
                  name="company_role"
                  value={formData.company_role}
                  options={selectOptions}
                  onChange={handleChange}
                />
              )}

              <UiButton isFullWidth size="large" variant="primary">
                Sign In
              </UiButton>
            </>
          )}
        </UiForm>
      </div>
    </StyledAuthScreen>
  );
}

export const StyledAuthScreen = styled.div`
  * {
    margin: 0;
  }
  .header-container {
    text-align: center;
    margin-bottom: ${pxToRem(40)};
    span {
      fill: var(--color-neutralBlack);
    }
    h1 {
      color: var(--color-neutralBlack);
      font-size: ${pxToRem(24)};
      margin-top: ${pxToRem(21)};
      margin-bottom: ${pxToRem(12)};
    }
    p {
      font-weight: 400;
      color: var(--color-gray-80);
      font-family: 'thiccboi-regular';
      font-size: ${pxToRem(16)};
      line-height: ${pxToRem(24)};
    }
  }
  .form-container {
    width: 100%;
    margin: 0 auto;
    max-width: ${pxToRem(450)};
    button {
      margin-top: ${pxToRem(45)};
    }
  }
  @media (min-width: 580px) {
    .form-container {
      width: 90%;
    }
  }
  @media (min-width: 700px) {
    .form-container {
      width: 80%;
      margin: 0 auto;
    }
  }
  @media (min-width: 900px) {
    .header-container {
      margin-bottom: ${pxToRem(48)};

      h1 {
        font-size: ${pxToRem(32)};
        margin-top: ${pxToRem(19)};
        margin-bottom: ${pxToRem(16)};
      }
      p {
        width: 80%;
        margin: 0 auto;
      }
    }
    .form-container {
      width: 100%;
      margin: 0 auto;
    }
  }
`;
export const Margin = styled.div`
  margin-bottom: ${pxToRem(24)};
`;

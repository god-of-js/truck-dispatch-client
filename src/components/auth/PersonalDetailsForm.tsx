import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiSelect from 'ui/UiSelect';
import { Option } from 'ui/UiSelect';
import UiForm from 'ui/UiForm';
import StyledAuthContent from './StyledAuthContent';

interface Props {
  goToNext: () => void;
}

export default function PersonDetailsForm({ goToNext }: Props) {
  const { userType } = useParams();
  const isCompany = userType?.includes('company');

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
  const onSubmit = () => {
    goToNext();
  };

  return (
    <StyledAuthContent>
      <header>
        <UiIcon icon="UserOctagon" size="45" />
        <h1>{header}</h1>
        <p>{text}</p>
      </header>
      <div className="form-container">
        <UiForm formData={formData} onSubmit={onSubmit}>
          {({ errors }) => (
            <div className="form-container__inner">
              <UiInput
                onChange={handleChange}
                value={formData.firstname}
                name="firstname"
                label="First Name*"
                placeholder="Enter your first name"
              />
              <UiInput
                onChange={handleChange}
                value={formData.lastname}
                name="lastname"
                label="Last Name*"
                placeholder="Enter your last name"
              />
              <UiInput
                onChange={handleChange}
                value={formData.email}
                name="email"
                label="Email Address*"
                placeholder="Enter your email adress"
              />
              <UiInput
                label="Phone Number*"
                type="phone"
                value={formData.phone}
                name="phone"
                error={errors.phone}
                onChange={handleChange}
              />
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
                Continue
              </UiButton>
            </div>
          )}
        </UiForm>
      </div>
    </StyledAuthContent>
  );
}

import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiSelect from 'ui/UiSelect';
import UiForm from 'ui/UiForm';
import { useDispatch } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { registerUser } from 'modules/Account';
import User from 'types/User';
import PersonalDetailsFormSchema from 'utils/validations/PersonalDetailsFormSchema';

interface Props {
  goToNext: () => void;
}
export default function PersonDetailsForm({ goToNext }: Props) {
  const { userType } = useParams();
  const dispatch = useDispatch();
  const isCompany = userType?.toLowerCase().includes('company');

  const header = isCompany ? 'Account Handler Details' : 'Personal Details';
  const text = isCompany
    ? 'Please provide your correct details in the input box below as a representative of the company'
    : 'Please provide your correct details in the input box below';

  function convertedUserType(): User['userType'] {
    // caters for user types that are not transportCompany and company
    if (!userType?.toLowerCase().includes('company'))
      return userType as User['userType'];
    // We are converting this because we want the default to be a singular user type until the individual has uploaded company registration documents.
    if (userType === 'transportCompany') return 'transporter';

    return 'agent';
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roleInCompany: '',
    userType: convertedUserType(),
  });
  const [loading, setLoading] = useState(false);
  const selectOptions = [
    {
      label: 'CEO/Owner',
      value: 'CEO',
    },
    {
      label: 'Manager',
      value: 'manager',
    },
    {
      label: 'Secretary',
      value: 'secretary',
    },
    {
      label: 'Accountant',
      value: 'accountant',
    },
  ];

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  const onSubmit = () => {
    setLoading(true);
    dispatch(toAnyAction(registerUser(formData)))
      .then(() => {
        goToNext();
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="form-container">
      <header>
        <UiIcon icon="UserOctagon" size="45" />
        <h1>{header}</h1>
        <p>{text}</p>
      </header>
      <UiForm
        formData={formData}
        schema={PersonalDetailsFormSchema}
        onSubmit={onSubmit}
      >
        {({ errors }) => (
          <div className="form-container__inner">
            <UiInput
              onChange={handleChange}
              value={formData.firstName}
              error={errors.firstName}
              name="firstName"
              label="First Name*"
              placeholder="Enter your first name"
            />
            <UiInput
              onChange={handleChange}
              value={formData.lastName}
              error={errors.lastName}
              name="lastName"
              label="Last Name*"
              placeholder="Enter your last name"
            />
            <UiInput
              onChange={handleChange}
              value={formData.email}
              error={errors.email}
              name="email"
              label="Email Address*"
              placeholder="Enter your email address"
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
                name="roleInCompany"
                value={formData.roleInCompany}
                options={selectOptions}
                onChange={handleChange}
              />
            )}

            <UiButton
              loading={loading}
              isFullWidth
              size="large"
              variant="primary"
            >
              Continue
            </UiButton>
          </div>
        )}
      </UiForm>
    </div>
  );
}

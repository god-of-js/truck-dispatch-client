import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { RegisterUser } from 'modules/Account';

import { Toast } from 'utils/toast';
import sizes from 'utils/sizes';

import UiInput from 'components/ui/UiInput';
import UiButton from 'components/ui/UiButton';
import UserWithPassword from 'types/UserWithPassword';
import UiSelect from 'ui/UiSelect';
import UiForm from 'components/ui/UiForm';
import { toAnyAction } from 'utils/helpers';
import registrationSchema from 'utils/validations/registrationSchema';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import UserTypeSelect from 'components/auth/SelectUserType';
import { PersonDetailsForm } from 'components/auth/PersonalDetailsForm';
import VerifyPhone from 'components/auth/VerifyPhone';
export default function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userType } = useParams();
  console.log( userType);
  
  const [formData, setFormData] = useState<UserWithPassword>({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
    userType: userType! as UserWithPassword['userType'],
    status: userType === 'transporter' ? 'unverified' : undefined,
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function handleSubmit() {
    setLoading(true);
    dispatch(toAnyAction(RegisterUser({ ...formData, createdAt: Date.now() })))
      .then(() => {
        navigate('/auth/verify-phone');
      })
      .catch(({ message }: { message: string }) => {
        Toast.error({ msg: message });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const isTransporter = userType === 'transporter';
  const isAgent = userType === 'agent';
  const heading = isTransporter
    ? 'Join Our Team Of Transporters'
    : 'Deliver with us As An Agent';

  return (
    <AuthLayoutStyling >
      <VerifyPhone />
      {/* <UiForm
        schema={registrationSchema}
        formData={formData}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <>
            <JoinUsHeading>{heading}</JoinUsHeading>
            <UiInput
              label="First Name*"
              value={formData.firstName}
              name="firstName"
              error={errors.firstName}
              onChange={handleChange}
            />
            <UiInput
              label="Last Name*"
              value={formData.lastName}
              name="lastName"
              error={errors.lastName}
              onChange={handleChange}
            />
            <UiInput
              label="Email*"
              value={formData.email}
              name="email"
              error={errors.email}
              onChange={handleChange}
            />
            <UiInput
              label="Phone Number*"
              type="phone"
              value={formData.phone}
              name="phone"
              error={errors.phone}
              onChange={handleChange}
            />

            <UiInput
              type="password"
              label="Password*"
              name="password"
              value={formData.password!}
              error={errors.password}
              onChange={handleChange}
            />
            <UiInput
              type="password"
              label="Confirm Password*"
              value={formData.cPassword!}
              name="cPassword"
              error={errors.cPassword}
              onChange={handleChange}
            />
            <PrivacyPolicyParagraph>
              By clicking on the following button, you are willing to become
              TruckDispatch's partner, and agree to our{' '}
              <a
                href="https://gettruckdispatch.com/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </a>{' '}
              and our{' '}
              <a
                href="https://gettruckdispatch.com/terms-and-conditions"
                target="_blank"
              >
                Terms of Service
              </a>
            </PrivacyPolicyParagraph>
            <UiButton isFullWidth loading={loading} size="large">
              Join as a{isAgent && 'n'} {userType}
            </UiButton>
            <AlreadyAMember>
              Already a member? <Link to="/auth/login">Sign In</Link>
            </AlreadyAMember>
          </>
        )}
      </UiForm> */}
    </AuthLayoutStyling>
  );
}

const JoinUsHeading = styled.h3`
  color: var(--color-primary);
  font-family: 'Audiowide';
  font-size: 24px;
`;
const GridSpacer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 12px;
  margin-bottom: 12px;

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;

const PrivacyPolicyParagraph = styled.p`
  color: var(--color-gray-500);
  font-size: 14px;
  margin-bottom: 16px;
`;

const AlreadyAMember = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-gray-400);
`;

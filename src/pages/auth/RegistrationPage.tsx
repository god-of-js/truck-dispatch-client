import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UiInput from '../../components/ui/UiInput';
import UiButton from '../../components/ui/UiButton';
import sizes from '../../sizes';
import UserType from '../../types/UserType';
import UserWithPassword from '../../types/UserWithPassword';
import { RegisterUser } from '../../modules/Account';
import { AnyAction } from 'redux';
import { Toast } from '../../utils/toast';
import UiForm, { RuleType } from '../../components/ui/UiForm';

interface Props {
  userType?: UserType;
}

export default function RegistrationPage({ userType = 'transporter' }: Props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserWithPassword>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
    userType,
    status: userType === 'transporter' ? 'unverified' : undefined,
  });
  const [loading, setLoading] = useState(false);
  const formRules: Record<string, RuleType[]> = {
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
    phone: ['required'],
    password: ['required', 'min.8'],
    cPassword: ['required', 'sameas.password'],
  };
  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function handleSubmit() {
    if (formData.cPassword !== formData.password) {
      alert('Passwords must match');
    }

    setLoading(true);
    dispatch(RegisterUser(formData) as unknown as AnyAction)
      .catch((err: { message: string }) => {
        let msg: string = err.message;

        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          msg = 'User with this email already exists';
        }

        Toast.error({ msg });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const isTransporter = () => userType === 'transporter';
  const heading = isTransporter() ? 'Join Our Team' : 'Deliver with us';

  return (
    <UiForm rules={formRules} formData={formData} onSubmit={handleSubmit}>
      {({ errors }) => (
        <>
          <JoinUsHeading>{heading}</JoinUsHeading>
          <GridSpacer>
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
          </GridSpacer>
          <PrivacyPolicyParagraph>
            By clicking on the following button, you are willing to become
            TruckDispatch's partner, and agree to our{' '}
            <Link to="/">privacy policy</Link>
          </PrivacyPolicyParagraph>
          <UiButton>
            Join as {isTransporter() ? 'a' : 'an'} {userType}
          </UiButton>
          <AlreadyAMember>
            Already a member? <Link to="/auth/login">Sign In</Link>
          </AlreadyAMember>
        </>
      )}
    </UiForm>
  );
}

const Form = styled.form`
  width: 100%;
`;
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

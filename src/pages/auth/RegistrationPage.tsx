import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UiInput from '../../components/ui/UiInput';
import UiButton from '../../components/ui/UiButton';
import sizes from '../../sizes';

interface Props {
  userType?: 'transporter' | 'agent';
}

export default function RegistrationPage({ userType = 'transporter' }: Props){
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
  });

  function handleChange(event: { target: { name: string; value: string } }) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (formData.cPassword !== formData.password) {
      alert('Passwords must match')
    }
  }

  const isTransporter = () => userType === 'transporter';
  const heading = isTransporter() ? 'Join Our Team' : '';
  const privacyPolicyText = isTransporter()
    ? "By clicking on the following button, you are willing to become TruckDispatch's partner, and agree to our "
    : '';

  return (
    <Form onSubmit={handleSubmit}>
      <JoinUsHeading>{heading}</JoinUsHeading>
      <GridSpacer>
        <UiInput
          label="First Name*"
          value={formData.firstName}
          name="firstName"
          onChange={handleChange}
        />
        <UiInput
          label="Last Name*"
          value={formData.lastName}
          name="lastName"
          onChange={handleChange}
        />
        <UiInput
          label="Email*"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <UiInput
          label="Phone Number*"
          type="phone"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
        />
        <UiInput
          type="password"
          label="Password*"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <UiInput
          type="password"
          label="Confirm Password*"
          value={formData.cPassword}
          name="cPassword"
          onChange={handleChange}
        />
      </GridSpacer>
      <PrivacyPolicyParagraph>
        {privacyPolicyText} <Link to="/">Privacy policy</Link>
      </PrivacyPolicyParagraph>
      <UiButton>Join as a {userType}</UiButton>
      <AlreadyAMember>
        Already a member? <Link to="/login">Sign In</Link>
      </AlreadyAMember>
    </Form>
  );
};

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

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UiInput from '../../components/ui/UiInput';
import UiButton from '../../components/ui/UiButton';
import sizes from '../../sizes';

interface Props {
  userType?: 'transporter' | 'agent';
}
const RegistrationPage: React.FC<Props> = ({ userType = 'transporter' }) => {
  const isTransporter = () => userType === 'transporter';
  const heading = isTransporter() ? 'Join Our Team' : '';
  const privacyPolicyText = isTransporter()
    ? "By clicking on the following button, you are willing to become TruckDispatch's parter, and agree to our "
    : '';
  return (
    <Form>
      <JoinUsHeading>{heading}</JoinUsHeading>
      <GridSpacer>
        <UiInput label="First Name*" value="" onChange={() => {}} />
        <UiInput label="Last Name*" value="" onChange={() => {}} />
        <UiInput label="Email*" value="" onChange={() => {}} />
        <UiInput label="Phone Number*" value="" onChange={() => {}} />
        <UiInput label="Password*" value="" onChange={() => {}} />
        <UiInput label="Confirm Password*" value="" onChange={() => {}} />
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

export default RegistrationPage;

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
  font-size: 16px;
  color: var(--color-gray-400);
`;

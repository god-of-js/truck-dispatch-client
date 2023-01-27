import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UiInput from '../../components/ui/UiInput';
import UiButton from '../../components/ui/UiButton';
import sizes from '../../sizes';
import UserType from '../../types/UserType';
import { loginUser } from '../../modules/Account';
import { AnyAction } from 'redux';
import UiForm, { RuleType } from '../../components/ui/UiForm';

interface Props {
  userType?: UserType;
}

export default function RegistrationPage({ userType = 'transporter' }: Props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    },
  );

  const formRules: Record<string, RuleType[]> = {
    firstName: ['required'],
    password: ['required'],
  };
  function handleChange(event: { target: { name: string; value: string } }) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    // Search for solution.
    dispatch(loginUser(formData) as unknown as AnyAction).then(() => {}).catch((err: { message: string}) => {
      let msg = err.message;

      if (msg === 'Firebase: Error (auth/wrong-password).') {
        msg = 'Email and password do not match'
      }

      if (msg === 'Firebase: Error (auth/user-not-found).') {
        msg = 'A user with this email does not exist'
      }

      console.log(msg)
    });
  }

  return (
    <UiForm rules={formRules} formData={formData} onSubmit={handleSubmit}>
      {({ errors }) => (
        <>
          <Heading>Sign in</Heading>
          <Margin>
            <UiInput
              label="Email*"
              value={formData.email}
              name="email"
              error={errors.email}
              onChange={handleChange}
            />
          </Margin>
          <Margin>
            <UiInput
              type="password"
              label="Password*"
              name="password"
              value={formData.password!}
              error={errors.password}
              onChange={handleChange}
            />
          </Margin>
          <PrivacyPolicyParagraph>
            By clicking on the following button, you are willing to become
            TruckDispatch's partner, and agree to our{' '}
            <Link to="/">privacy policy</Link>
          </PrivacyPolicyParagraph>
          <UiButton>Sign In</UiButton>
          <ForgotPassword>
            Can't login? try <Link to="/forgot-password">forgot password</Link>
          </ForgotPassword>
        </>
      )}
    </UiForm>
  );
}

const Form = styled.form`
  width: 100%;
`;
const Heading = styled.h3`
  color: var(--color-primary);
  font-family: 'Audiowide';
  font-size: 24px;
`;
const Margin = styled.div`
  margin-bottom: 12px;
`;

const PrivacyPolicyParagraph = styled.p`
  color: var(--color-gray-500);
  font-size: 14px;
  margin-bottom: 16px;
`;

const ForgotPassword = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-gray-400);
`;

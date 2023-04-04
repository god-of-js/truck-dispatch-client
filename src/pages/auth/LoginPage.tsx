import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../modules/Account';

import { Toast } from '../../utils/toast';
import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import { toAnyAction } from 'utils/helpers';
import loginSchema from 'utils/validations/loginSchema';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    },
  );
  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function handleSubmit() {
    setLoading(true);
    dispatch(toAnyAction(loginUser(formData)))
      .then(() => {
        navigate('/my-trips');
      })
      .catch((err: Error) => {
        let msg = err.message;
        if (msg === 'Phone has not been verified') {
          navigate('/auth/verify-phone');
        }
        console.log(err);
        Toast.error({ msg });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <UiForm schema={loginSchema} formData={formData} onSubmit={handleSubmit}>
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
            <UiButton isFullWidth loading={loading} size='large' variant='primary'>
              Sign In
            </UiButton>
            {/* <ForgotPassword>
            Can't login? try{' '}
            <Link to="/auth/join/transporter">forgot password</Link>
          </ForgotPassword> */}
            <LinkToRegisteration>
              Don't have an account?{' '}
              <Link to="/auth/join/agent">register with us</Link>
            </LinkToRegisteration>
          </>
        )}
      </UiForm>
    </>
  );
}

const Heading = styled.h3`
  color: var(--color-primary);
  font-family: 'Audiowide';
  font-size: ${pxToRem(24)};
`;
const Margin = styled.div`
  margin-bottom: ${pxToRem(12)};
`;

const PrivacyPolicyParagraph = styled.p`
  color: var(--color-gray-500);
  font-size: ${pxToRem(14)};
  margin-bottom: ${pxToRem(16)};
`;

const ForgotPassword = styled.p`
  text-align: center;
  font-size: ${pxToRem(14)};
  color: var(--color-gray-400);
`;

const LinkToRegisteration = styled.p`
  text-align: center;
  font-size: ${pxToRem(14)};
  color: var(--color-gray-400);
`;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { requestForgotPasswordLink } from '../../modules/Account';

import UiInput from 'ui/UiInput';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import { toAnyAction } from 'utils/helpers';
import ForgotPasswordSchema from 'utils/validations/ForgotPasswordSchema';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
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
    dispatch(toAnyAction(requestForgotPasswordLink(formData)))
      .then(() => {
        navigate('/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
      <Page>
        <UiForm
          schema={ForgotPasswordSchema}
          formData={formData}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <>
              <Heading>Lost your password?</Heading>
              <p>
                To receive a signin link, enter the email address linked to your
                Truckdispatch account.
              </p>
              <Margin>
                <UiInput
                  label="Email*"
                  value={formData.email}
                  name="email"
                  error={errors.email}
                  onChange={handleChange}
                />
              </Margin>
              <UiButton isFullWidth loading={loading}>
                Send recovery link
              </UiButton>
              <LinkToRegisteration>
                Remembered your password? <Link to="/auth/login">Sign In</Link>
              </LinkToRegisteration>
            </>
          )}
        </UiForm>
      </Page>
  );
}

const Page = styled.div`
  width: 100%;

  p {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-500);
  }
`;

const Heading = styled.h3`
  color: var(--color-primary);
  font-family: 'Audiowide';
  font-size: ${pxToRem(24)};
`;

const Margin = styled.div`
  margin-bottom: ${pxToRem(12)};
`;

const LinkToRegisteration = styled.p`
  text-align: center;
  font-size: ${pxToRem(14)};
  color: var(--color-gray-400);
`;

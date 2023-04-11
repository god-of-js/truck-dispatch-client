import Loader from 'components/layout/Loader';
import { VerifyEmail } from 'modules/Account';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';
import { Toast } from 'utils/toast';

export default function verifyEmailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get('token');

  function verifyEmail() {
    if (!token) {
      Toast.error({ msg: 'Verification Token was not provided' });
      return;
    }
    dispatch(toAnyAction(VerifyEmail(token)))
      .then(() => {
        navigate('/auth/login');
      })
      .catch((err: Error) => {
        if (
          err.message ===
          'Something went wrong. Kindly request a new OTP for verification'
        ) {
          navigate('/auth/verify-phone/request-code');
        }
      })
  }

  useEffect(verifyEmail, []);

  return (
    <VerifyPhone>
      <h3>Verify Email</h3>
      <p>Kindly wait while we verify your email</p>
      <Loader />
    </VerifyPhone>
  );
}

const VerifyPhone = styled.div`
  h3 {
    color: var(--color-primary);
    font-family: 'Audiowide';
    font-size: ${pxToRem(24)};
    margin-bottom: ${pxToRem(8)};
  }
  p {
    color: var(--color-gray-500);
    font-size: ${pxToRem(16)};
  }
`;

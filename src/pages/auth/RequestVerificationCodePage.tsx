import { sendOTP } from 'modules/Account';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import { toAnyAction } from 'utils/helpers';
import { Toast } from 'utils/toast';
import RequestVerificationCode from 'utils/validations/RequestVerificationCode';

export default function VerifyPhonePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  function setPhone({ value }: { name: string; value: string | null }) {
    setFormData({ phone: value! });
  }

  function requestOTP() {
    setLoading(true);
    dispatch(toAnyAction(sendOTP(formData.phone)))
      .then(() => {
        Toast.success({
          msg: 'Verification code has been sent as SMS to your number',
        });
        navigate('/auth/verify-phone');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <VerifyPhone>
      <h3>Request OTP</h3>
      <p>
        Phone number verification is required before you get access to the
        TruckDispatch dashboard. Kindly fill the form below to request an OTP
        for verification.
      </p>
      <UiForm
        formData={formData}
        schema={RequestVerificationCode}
        onSubmit={requestOTP}
      >
        {({ errors }) => (
          <>
            <UiInput
              value={formData.phone}
              label="Enter Phone Number"
              name="phone"
              error={errors.phone}
              onChange={setPhone}
            />
            <div className="actions">
              <UiButton loading={loading}>Request OTP</UiButton>
              <Link to="/auth/verify-phone">
                <UiButton variant="primary-text" type="button">
                  Take me back to verify
                </UiButton>
              </Link>
            </div>
          </>
        )}
      </UiForm>
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
  form {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(12)};
    margin-top: ${pxToRem(20)};
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

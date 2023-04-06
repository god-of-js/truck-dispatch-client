import { sendOTP, VerifyOtp } from 'modules/Account';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import { toAnyAction } from 'utils/helpers';
import { Toast } from 'utils/toast';
import VerifyPhoneSchema from 'utils/validations/VerifyPhoneSchema';

export default function VerifyPhonePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pin: '',
  });
  const [loading, setLoading] = useState(false);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);

  function setPin({ value }: { name: string; value: string | null }) {
    setFormData({ pin: value! });
  }

  function verifyPhoneNumber() {
    try {
      setLoading(true);
      dispatch(toAnyAction(VerifyOtp(formData.pin)))
        .then(() => {
          Toast.success({ msg: 'Phone number verification was successful' });
          navigate('/auth/login');
        })
        .catch((err: Error) => {
          console.log(err.message);
          if (
            err.message ===
            'Something went wrong. Kindly request a new OTP for verification'
          ) {
            navigate('/auth/verify-phone/request-code');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function requestNewCode() {
    const otpPhoneNumber = localStorage.getItem('otp-phone-number');
    if (!otpPhoneNumber) {
      navigate('/auth/verify-phone/request-code');
      return;
    }
    setSendOTPLoading(true);
    dispatch(toAnyAction(sendOTP(otpPhoneNumber))).finally(() => {
      setSendOTPLoading(false);
    });
  }
  return (
    <VerifyPhone>
      <h3>Verify Account</h3>
      <p>
        A text message with your verification pin has been sent to your phone
        number. Kindly, input the pin below to verify your account.
      </p>
      <UiForm
        formData={formData}
        schema={VerifyPhoneSchema}
        onSubmit={verifyPhoneNumber}
      >
        {({ errors }) => (
          <>
            <UiInput
              value={formData.pin}
              label="Enter Phone OTP"
              name="pin"
              error={errors.pin}
              onChange={setPin}
            />
            <div className="actions">
              <UiButton loading={loading}>Verify Account</UiButton>
              <UiButton
                variant="primary-text"
                type="button"
                loading={sendOTPLoading}
                onClick={requestNewCode}
              >
                Request new code{' '}
              </UiButton>
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

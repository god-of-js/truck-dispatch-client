import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendOTP, updatePassword } from 'modules/Account';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';
import ChangePasswordSchema from 'utils/validations/ChangePasswordSchema';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeUserSessionId } from 'utils/localStorageMethods';
import { RootState } from 'modules/index';

const UiCard = lazy(() => import('ui/UiCard'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiInput = lazy(() => import('ui/UiInput'));
export default function ManagePasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  const isPhoneVerified = new URLSearchParams(location.search).get(
    'isPhoneVerified',
  );
  const dispatch = useDispatch();
  const defaultPasswordData = {
    password: '',
    cPassword: '',
  };
  const [formData, setFormData] = useState(defaultPasswordData);
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    try {
      setLoading(true);
      dispatch(toAnyAction(updatePassword({ password: formData.password })))
        .then(() => {
          setFormData(defaultPasswordData);
          if (isPhoneVerified === 'false') {
            return dispatch(toAnyAction(sendOTP(user?.phone!))).then(() => {
              removeUserSessionId();
              navigate('/auth/verify-phone');
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }
  }

  function onChange(event: {
    name: string;
    value: string | File | File[] | null;
  }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  return (
    <CardContainer>
      <UiCard>
        <header>
          <h2>Update Password</h2>
        </header>

        <UiForm
          formData={formData}
          schema={ChangePasswordSchema}
          onSubmit={changePassword}
        >
          {({ errors }) => (
            <div className="form-inner">
              <UiInput
                label="New Password"
                value={formData.password}
                name="password"
                type="password"
                error={errors.password}
                onChange={onChange}
              />
              <UiInput
                label="Confirm new password"
                value={formData.cPassword}
                name="cPassword"
                type="password"
                error={errors.cPassword}
                onChange={onChange}
              />
              <UiButton isFullWidth loading={loading}>
                Reset Password
              </UiButton>
              {!!(formData.password || formData.cPassword) ? (
                <UiButton
                  variant="primary-text"
                  type="button"
                  isFullWidth
                  loading={loading}
                  onClick={() => setFormData(defaultPasswordData)}
                >
                  Cancel
                </UiButton>
              ) : (
                ''
              )}
            </div>
          )}
        </UiForm>
      </UiCard>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 90%;
  margin: auto;
  color: var(--color-gray-600);

  header {
    padding:24px 0;
  }
  h2 {
    font-size:20px;
    padding: 0;
    margin: 0;
  }
  .form-inner {
    display: flex;
    flex-direction: column;
    row-gap:16px;
    padding-bottom:20px;
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 80%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 30%;
  }
`;

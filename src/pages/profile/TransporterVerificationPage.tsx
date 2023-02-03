import VerificationForm from 'components/profile/VerificationForm';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import sizes from '../../sizes';
import FilesSent from '../../assets/img/files-sent.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../modules';
import { createOrUpdateUser, getUser } from '../../modules/Account';
import { AnyAction } from 'redux';

export default function TransporterVerificationPage() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  // TODO: ask Ben
  const user = useSelector((state: AppState) => state.account.user);

  const componentBasedOnVerificationStatus = useMemo(() => {
    if (!isVerified && user.status === 'unverified') {
      return <VerificationForm onVerified={setVerificationStatus} />;
    }
    if (user.status === 'verified') {
      return (
        <div className="details-feedback">
          <img
            src={FilesSent}
            alt="User has been verified"
          />
          <h2>User has been verified</h2>
          <p>
            Your profile has been verified. Now, you are eligible to partake in rides, bonuses, 
            and all features available to transporters.

          </p>
        </div>
      );
    }
    if (isVerified || user.status === 'pending_verification') {
      return (
        <div className="details-feedback">
          <img
            src={FilesSent}
            alt="verification details has been sent, we would get back shortly."
          />
          <h2>Verification details have been sent</h2>
          <p>
            Your verification details has been sent. expect a mail or text
            message from the organization in 24 hours regarding if your profile
            has been approved or declined.{' '}
          </p>
        </div>
      );
    }
  }, [isVerified]);

  function setVerificationStatus() {
    setIsVerified(true);
    const verificationPendingUser = {
      ...user,
      status: 'pending_verification',
    };
    dispatch(
      createOrUpdateUser(verificationPendingUser) as unknown as AnyAction,
    ).then(() => {
      dispatch(getUser() as unknown as AnyAction);
    });
  }
  return (
    <TransportVerificationCard>
      {componentBasedOnVerificationStatus}
    </TransportVerificationCard>
  );
}

const TransportVerificationCard = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  .details-feedback {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: ${pxToRem(380)};
    margin: auto;
  }

  h2 {
    text-align: center;
    font-size: ${pxToRem(20)};
    font-family: 'Audiowide';
    margin-bottom: 0;
  }

  p {
    text-align: center;
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 60%;
    border-top: none;
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
    h2 {
      text-align: center;
      font-size: ${pxToRem(24)};
    }
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 40%;
  }
`;

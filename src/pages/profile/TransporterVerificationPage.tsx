import React, { lazy, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';

import { getUserVerification } from '../../modules/Verification';

import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

const VerificationForm = lazy(
  () => import('components/profile/VerificationForm'),
);
const MessageWithImage = lazy(() => import('ui/MessageWithImage'));

export default function TransporterVerificationPage() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.account.user);
  const userVerification = useSelector(
    (state: RootState) => state.verification.verification,
  );
  const userHasBeenVerified = <MessageWithImage />;

  const userIsAwaitingVerification = (
    <MessageWithImage
      title="Verification details have been sent"
      subtitle={`Your verification details has been sent. expect a mail or text
  message from the organization in 3 working days regarding if your profile
  has been approved or declined`}
    />
  );

  const componentBasedOnVerificationStatus = useMemo(() => {
    if (isVerified || user?.status === 'pending_verification') {
      return userIsAwaitingVerification;
    }

    if (
      (!isVerified && user?.status === 'unverified') ||
      user?.status === 'rejected'
    ) {
      return (
        <VerificationForm
          onVerified={setVerificationStatus}
          parentLoading={loading}
        />
      );
    }

    if (user?.status === 'verified') {
      return userHasBeenVerified;
    }
  }, [isVerified]);

  useEffect(() => {
    if (user?.status === 'rejected') {
      setLoading(true);
      dispatch(toAnyAction(getUserVerification())).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  function setVerificationStatus() {
    setIsVerified(true);
  }

  return (
    <>
      <VerificationPageStyling>
        <TransportVerificationCard>
          {componentBasedOnVerificationStatus}
        </TransportVerificationCard>
        {user?.status === 'rejected' && (
          <FeedbackCard>
            <h2>Admin Remark</h2>
            <p>{userVerification?.adminMessage}</p>
          </FeedbackCard>
        )}
      </VerificationPageStyling>
    </>
  );
}

const VerificationPageStyling = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap:24px;
  justify-content: center;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    flex-direction: row;
  }
`;
const TransportVerificationCard = styled.div`
  background: #ffff;
  width: 90%;
  border: 1px solid var(--color-gray-200);
  padding:20px;
  border-radius:8px;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 60%;
    border-top: none;
    position: static;
    border-right:1px solid var(--color-gray-200);
    h2 {
      text-align: center;
      font-size:24px;
    }
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 40%;
  }
`;

const FeedbackCard = styled.div`
  background: #ffffff;
  width: 90%;
  border: 1px solid var(--color-gray-200);
  padding:20px;
  border-radius:8px;

  h2 {
    font-size:20px;
  }
  p {
    font-size:16px;
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 30%;
  }
`;

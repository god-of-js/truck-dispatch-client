// Deprecated.
import React, { lazy, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';

import { getUserVerification } from 'modules/Verification';

import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';
import VerificationPage from '../verification/VerificationPage';

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
      return <VerificationPage onVerified={setVerificationStatus} />;
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
      {componentBasedOnVerificationStatus}
      {user?.status === 'rejected' && (
        <FeedbackCard>
          <h2>Admin Remark</h2>
          <p>{userVerification?.adminMessage}</p>
        </FeedbackCard>
      )}
    </>
  );
}

const FeedbackCard = styled.div`
  background: #ffffff;
  width: 90%;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  h2 {
    font-size: ${pxToRem(20)};
  }
  p {
    font-size: ${pxToRem(16)};
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 30%;
  }
`;

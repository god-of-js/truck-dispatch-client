import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../modules';
import { createOrUpdateUser, getUser } from '../../modules/Account';

import User from 'types/User';

import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

import VerificationForm from 'components/profile/VerificationForm';
import MessageWithImage from 'ui/MessageWithImage';
import AccessDenied from 'assets/img/access-denied.svg';

export default function TransporterVerificationPage() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const user = useSelector((state: RootState) => state.account.user);
  const userHasBeenVerified = <MessageWithImage />;
  const userIsAwaitingVerification = (
    <MessageWithImage
      title="Verification details have been sent"
      subtitle={`Your verification details has been sent. expect a mail or text
  message from the organization in 24 hours regarding if your profile
  has been approved or declined`}
    />
  );
  const userVerificationWasRejected = (
    <MessageWithImage
      img={AccessDenied}
      title="Your verification has been declined"
      subtitle="Kindly reach out to support@truckdispatch.ng for more assistance and further clarification "
    />
  );

  const componentBasedOnVerificationStatus = useMemo(() => {
    if (!isVerified && user?.status === 'unverified') {
      return <VerificationForm onVerified={setVerificationStatus} />;
    }

    if (user?.status === 'verified') {
      return userHasBeenVerified;
    }
    if (user?.status === 'rejected') {
      return userVerificationWasRejected;
    }

    if (isVerified || user?.status === 'pending_verification') {
      return userIsAwaitingVerification;
    }
  }, [isVerified]);

  function setVerificationStatus() {
    setIsVerified(true);
    if (user === null) return;
    const verificationPendingUser: User = {
      ...user,
      status: 'pending_verification',
    };
    dispatch(toAnyAction(createOrUpdateUser(verificationPendingUser))).then(
      () => {
        dispatch(toAnyAction(getUser()));
      },
    );
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

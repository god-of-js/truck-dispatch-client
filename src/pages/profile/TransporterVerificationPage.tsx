import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  createOrUpdateUser,
  getUsers,
  selectDashboardUser,
} from '../../modules/Account';

import User from 'types/User';

import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

import VerificationForm from 'components/profile/VerificationForm';
import MessageWithImage from 'ui/MessageWithImage';
import AccessDenied from '../../assets/img/access-denied.svg';

export default function TransporterVerificationPage() {
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const user = useSelector(selectDashboardUser);
  const userHasBeenVerified = <MessageWithImage />;
  const userIsAwaitingVerification = (
    <MessageWithImage
      title="Verification details have been sent"
      subtitle={`Your verification details has been sent. expect a mail or text
  message from the organization in 3 working days regarding if your profile
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
    if (!isVerified && user?.status === 'unverified' || user?.status === 'rejected') {
      return <VerificationForm onVerified={setVerificationStatus} />;
    }

    if (user?.status === 'verified') {
      return userHasBeenVerified;
    }

    if (isVerified || user?.status === 'pending_verification') {
      return userIsAwaitingVerification;
    }
  }, [isVerified]);

  function setVerificationStatus() {
    setIsVerified(true);
    if (!user) return;
    const verificationPendingUser: User = {
      ...user,
      status: 'pending_verification',
    };
    dispatch(toAnyAction(createOrUpdateUser(verificationPendingUser))).then(
      () => {
        dispatch(toAnyAction(getUsers()));
      },
    );
  }

  return (
    <VerificationPageStyling>
      <TransportVerificationCard>
        {componentBasedOnVerificationStatus}
      </TransportVerificationCard>
      <FeedbackCard></FeedbackCard>
    </VerificationPageStyling>
  );
}

const VerificationPageStyling = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${pxToRem(24)};
  justify-content: center;
`;
const TransportVerificationCard = styled.div`
  background: #ffffff;
  width: 90%;
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

const FeedbackCard = styled.div`
  background: #ffffff;
  width: 30%;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};
`;

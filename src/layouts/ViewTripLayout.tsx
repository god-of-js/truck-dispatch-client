import React, { useEffect, useMemo, useState } from 'react';
import { Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTrip } from 'modules/Trips';

import sizes from 'utils/sizes';

import Loader from 'components/layout/Loader';
import UiTabs from 'components/ui/UiTabs';
import UiBackButton from 'ui/UiBackButton';
import UiOverlay from 'ui/UiOverlay';
import RateTransporter from 'components/ratings/RateUser';
import { toAnyAction } from 'utils/helpers';
import { getTripRating } from 'modules/Ratings';
import Rating from 'types/Rating';
import { getPaymentRequestByTripId } from 'modules/Payments';
import { RootState } from 'modules/index';
import { clientBasedUserTypes, serviceBasedUserTypes } from 'utils/constants';

export default function ViewTrip() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
  const paymentRequest = useSelector(
    (state: RootState) => state.payment.paymentRequest,
  );
  const trip = useSelector(selectTrip(tripId!));
  const [isRatingsModalVisible, setIsRatingsModalVisible] = useState(false);
  const unfilteredTabs = [
    {
      label: 'Trip Details',
      path: `/my-trips/${tripId}`,
    },
    {
      label: 'View Bids',
      path: `/my-trips/${tripId}/bids`,
    },
    {
      label: 'Trip Status',
      path: `/my-trips/${tripId}/status`,
    },
    {
      label: 'Terminal Delivery Order',
      path: `/my-trips/${tripId}/terminal-delivery-order`,
    },
    {
      label: 'Request Payment For Trip',
      path: `/my-trips/${tripId}/request-payment-for-trip`,
    },
    {
      label: 'View Payment Request',
      path: `/my-trips/${tripId}/view-payment-request`,
    },
  ];

  const tabs = useMemo(() => {
    return unfilteredTabs.filter((tab) => {
      if (clientBasedUserTypes.includes(user?.userType!)) return clientChecks(tab.path);
      if (serviceBasedUserTypes.includes(user?.userType!)) return transporterChecks(tab.path);
    });
  }, [user, trip, paymentRequest?.status]);

  function clientChecks(path: string) {
    if (path.includes('bids') && trip?.status !== 'awaiting-bid') return false;
    if (
      path.includes('view-payment-request') &&
      trip?.status !== 'awaiting-bid' &&
      paymentRequest?.status !== 'completed'
    ) {
      return true;
    }

    if (path.includes('payment')) return false;
    if (
      path.includes('terminal-delivery-order') &&
      trip?.status === 'awaiting-bid'
    ) {
      return false;
    }

    return true;
  }

  function transporterChecks(path: string) {
    if (path.includes('bids') || path.includes('view-payment-request'))
      return false;

    if (
      path.includes('request-payment-for-trip') &&
      paymentRequest?.status === 'completed'
    ) {
      return false;
    }
    return true;
  }

  function closeRateTransporter() {
    setIsRatingsModalVisible(false);
  }

  useEffect(() => {
    if (clientBasedUserTypes.includes(user?.userType!) && trip?.status === 'completed') {
      dispatch(toAnyAction(getTripRating(tripId!))).then((data: Rating) => {
        if (!data) setIsRatingsModalVisible(true);
      });
    }
  }, [tripId, trip]);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestByTripId(tripId!)));
  }, [tripId]);

  return (
    <>
      {/* TODO: handle is400 */}
      <TabContainer>
        <UiTabs tabs={tabs} />
      </TabContainer>
      <OutletContainer>
        <UiBackButton />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </OutletContainer>
      <UiOverlay isVisible={isRatingsModalVisible}>
        <RateTransporter onClose={closeRateTransporter} />
      </UiOverlay>
    </>
  );
}

const TabContainer = styled.div`
  background-color: #ffffff;
  padding: ${pxToRem(20)} ${pxToRem(20)} 0 ${pxToRem(20)};
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding-top: ${pxToRem(24)};
  }
`;

const OutletContainer = styled.div`
  padding: ${pxToRem(20)} 0;
  min-height: 70%;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding: ${pxToRem(48)} 0;
  }
`;

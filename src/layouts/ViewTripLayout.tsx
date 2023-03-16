import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectDashboardUser } from 'modules/Account';
import { selectTrip } from 'modules/Trips';

import sizes from 'utils/sizes';

import Loader from 'components/layout/Loader';
import UiTabs from 'components/ui/UiTabs';
import UiBackButton from 'ui/UiBackButton';
import UiOverlay from 'ui/UiOverlay';
import RateTransporter from 'components/ratings/RateTransporter';
import { toAnyAction } from 'utils/helpers';
import { getTripRating } from 'modules/Ratings';
import Rating from 'types/Rating';
import { getPaymentRequestByTripId } from 'modules/Payments';
import { RootState } from 'modules/index';

export default function ViewTrip() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectDashboardUser);
  const paymentRequest = useSelector(
    (state: RootState) => state.payment.paymentRequest,
  );
  const trip = useSelector(selectTrip(tripId!));
  const [isRatingsModalVisible, setIsRatingsModalVisible] = useState(false);
  const unfilteredTabs = [
    {
      label: 'Trip Details',
      path: `/dashboard/my-trips/${tripId}`,
    },
    {
      label: 'View Bids',
      path: `/dashboard/my-trips/${tripId}/bids`,
    },
    {
      label: 'Trip Status',
      path: `/dashboard/my-trips/${tripId}/status`,
    },
    {
      label: 'Terminal Delivery Order',
      path: `/dashboard/my-trips/${tripId}/terminal-delivery-order`,
    },
    {
      label: 'Request Payment For Trip',
      path: `/dashboard/my-trips/${tripId}/request-payment-for-trip`,
    },
    {
      label: 'View Payment Request',
      path: `/dashboard/my-trips/${tripId}/view-payment-request`,
    },
  ];

  const tabs = useMemo(() => {
    return unfilteredTabs.filter((tab) => {
      if (user?.userType === 'agent') return agentChecks(tab.path);
      else if (user?.userType === 'transporter')
        return transporterChecks(tab.path);
    });
  }, [user, trip, paymentRequest?.status]);

  function agentChecks(path: string) {
    if (path.includes('bids') && trip?.status !== 'awaiting_bid') return false;
    if (
      path.includes('view-payment-request') &&
      trip?.status !== 'awaiting_bid' &&
      paymentRequest?.status !== 'completed'
    ) {
      return true;
    }

    if (path.includes('payment')) return false;
    if (
      path.includes('terminal-delivery-order') &&
      trip?.status === 'awaiting_bid'
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
    if (user?.userType === 'agent' && trip?.status === 'completed') {
      dispatch(toAnyAction(getTripRating(tripId!))).then((data: Rating[]) => {
        if (data.length === 0) setIsRatingsModalVisible(true);
      });
    }
  }, [tripId, trip]);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestByTripId(tripId)));
  }, [tripId]);

  return (
    <>
      {/* TODO: handle is400 */}
      <TabContainer>
        <UiTabs tabs={tabs} />
      </TabContainer>
      <OutletContainer>
        <UiBackButton />
          <Outlet />
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

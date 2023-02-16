import React, { useEffect, useMemo, useState } from 'react';
import { Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectDashboardUser } from 'modules/Account';
import { selectTrip } from 'modules/Trips';

import sizes from 'utils/sizes';

import Loader from 'components/layout/Loader';
import UiTabs from 'components/ui/UiTabs';
import UiBackButton from 'ui/UiBackButton';

export default function ViewTrip() {
  const { tripId } = useParams();
  const user = useSelector(selectDashboardUser);
  const trip = useSelector(selectTrip(tripId || ''));
  const [is400, setIs400] = useState(false);
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
  ];

  const tabs = useMemo(() => {
    return unfilteredTabs.filter((tab) => {
      if (user?.userType === 'agent') return agentChecks(tab.path);
      else if (user?.userType === 'transporter')
        return transporterChecks(tab.path);
    });
  }, [user]);

  function agentChecks(path: string) {
    if (path.includes('bids') && trip?.status !== 'awaiting_bid') return false;

    if (
      path.includes('terminal-delivery-order') &&
      trip?.status === 'awaiting_bid'
    )
      return false;

    return true;
  }

  function transporterChecks(path: string) {
    if (path.includes('bids')) return false;
    return true;
  }
  useEffect(() => {
    //   TODO: show user no trip id was found.
    if (!tripId) setIs400(true);
  });

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

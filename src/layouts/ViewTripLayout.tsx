import React, { useEffect } from 'react';
import { Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';

import sizes from 'utils/sizes';

import Loader from 'components/layout/Loader';
import UiTabs from 'components/ui/UiTabs';

export default function ViewTrip() {
  const { tripId } = useParams();
  const agentRoutes = [
    {
      label: 'Trip Details',
      path: `/my-trips/${tripId}`,
    },
    {
      label: 'View Bids',
      path: `/my-trips/${tripId}/bids`,
    },
    {
      label: 'Driver Details',
      path: '/profile/verification',
    },
  ];

  useEffect(() => {});

  return (
    <>
      <TabContainer>
        <UiTabs tabs={agentRoutes} />
      </TabContainer>
      <OutletContainer>
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
  padding: ${pxToRem(24)} 0;
  min-height: 70%;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding: ${pxToRem(48)} 0;
  }
`;

import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import sizes from '../utils/sizes';
import { RootState } from 'modules/index';

import Loader from 'components/layout/Loader';
import UiTabs from 'components/ui/UiTabs';
import { useSelector } from 'react-redux';

export default function ProfileLayout() {
  const user = useSelector((state: RootState) => state.account.user);

  const routes = [
    {
      label: 'Profile',
      path: '/profile',
    },
    {
      label: 'Accounts',
      path: '/profile/accounts',
    },
    {
      label: 'Verification',
      path: '/profile/verification',
    },
  ].filter((route) => {
    if (user?.userType === 'agent') return route.path === '/profile';

    if (user?.status === 'verified')
      return route.path !== '/profile/verification';

    return true;
  });

  return (
    <>
      <TabContainer>
        <UiTabs tabs={routes} />
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

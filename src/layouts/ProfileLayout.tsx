import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import sizes from '../utils/sizes';
import { RootState } from 'modules/index';

import Loader from 'components/layout/Loader';
import UiTabs from 'components/ui/UiTabs';
import { useSelector } from 'react-redux';
import { clientBasedUserTypes } from 'utils/constants';

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
    {
      label: 'Manage Password',
      path: '/profile/manage-password',
    },
  ].filter((route) => {
    if (clientBasedUserTypes.includes(user?.userType!))
      return (
        route.path === '/profile' || route.path === '/profile/manage-password'
      );

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
  padding:20px 20px 0 20px;
  border-bottom:1px solid var(--color-gray-200);

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding-top:24px;
  }
`;

const OutletContainer = styled.div`
  padding:24px 0;
  min-height: 70%;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding:48px 0;
  }
`;

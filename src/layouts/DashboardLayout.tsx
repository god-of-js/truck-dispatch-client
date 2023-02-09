import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import { getUser } from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import Loader from 'components/layout/Loader';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(toAnyAction(getUser()))
      .catch((err: Error) => {
        console.log(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const Component = isLoading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
  return (
    <Layout>
      <DashboardSidebar />
      <Body>
        <DashboardTopNav />
        {/* TODO: put a message for transporter to verify if not yet verified */}
        <div className="body-components-container">{Component}</div>
      </Body>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--color-gray-100);
  overflow: hidden;
`;

const Body = styled.div`
  position: relative;
  overflow-x: auto;
  width: 100%;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 97%;
    border-top: none;
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 95%;
  }
`;

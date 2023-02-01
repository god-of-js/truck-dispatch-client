import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnyAction } from 'redux';
import styled from 'styled-components';
import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import { getUser } from '../modules/Account';
import sizes from '../sizes';
import Loader from 'components/layout/Loader';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser() as unknown as AnyAction).catch(() => {
      console.log('error occurs');
    });
  });

  return (
    <Layout>
      <DashboardSidebar />
      <Body>
        <DashboardTopNav />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
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
  overflow-x: hidden;
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

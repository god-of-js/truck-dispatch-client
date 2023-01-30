import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import styled from 'styled-components';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardTopNav from '../components/layout/DashboardTopNav';
import { getUser } from '../modules/Account';
// TODO: Fix errors regarding page loading.

export default function DashboardLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('useEffect');
    dispatch(getUser() as unknown as AnyAction);
  });
  return (
    <Layout>
      <DashboardSidebar />
      <Body>
        <DashboardTopNav />
      </Body>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--color-gray-100);
`;

const Body = styled.div`
  width: 100%;
`;

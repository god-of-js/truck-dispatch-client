import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnyAction } from 'redux';
import styled from 'styled-components';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardTopNav from '../components/layout/DashboardTopNav';
import { getUser } from '../modules/Account';

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
        <Outlet />
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
  width: 95%;
  position: relative;
  overflow-x: hidden;
`;

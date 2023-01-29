import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardTopNav from '../components/layout/DashboardTopNav';

export default function DashboardLayout() {
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

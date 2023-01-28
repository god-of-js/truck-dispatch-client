import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardSidebar from '../components/layout/DashboardSidebar';

export default function DashboardLayout() {
  return (
    <Layout>
      <DashboardSidebar />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--color-primary-50);
`;

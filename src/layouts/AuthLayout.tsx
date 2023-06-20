import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AuthLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const Layout = styled.main`
  height: 100vh;
`;

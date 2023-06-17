import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/my-trips');
    }
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const Layout = styled.main`
  height: 100vh;
`;

import React, { useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import sizes from '../utils/sizes';
import TruckDispatchLogo from '../assets/img/truck-dispatch-full-logo.svg';
import { userTypes } from 'utils/constants';

export default function AuthLayout() {
  const { userType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/my-trips');
      return;
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
}


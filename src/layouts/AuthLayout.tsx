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
    if (location.pathname.includes('join') && !userTypes.includes(userType!)) {
      navigate('/auth/join/agent');
    }
  }, []);

  return (
    <main>
      <Header>
        <a href="https://gettruckdispatch.com">
          <img
            src={TruckDispatchLogo}
            alt="truck-dispatch"
            width="100"
            height="100"
          />
        </a>
      </Header>
      <Outlet />
    </main>
  );
}

const Header = styled.header`
  padding: 0 ${pxToRem(16)};
  z-index: 3;
  left: 0;
  right: 0;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    position: absolute;
  }
`;

import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import { getUsers, selectDashboardUser } from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import Loader from 'components/layout/Loader';
import UiAlert from 'ui/UiAlert';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const user = useSelector(selectDashboardUser);

  useEffect(() => {
    const user = localStorage.getItem('uid');
    if (!user) {
      navigate('auth/join/transporter');
    }
    dispatch(toAnyAction(getUsers()))
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
        {user?.status === 'unverified' && (
          <UiAlert variant="warning">
            Verification is required to access all core features of the
            application. To complete verification,{' '}
            <Link to="/profile/verification">Click Here</Link>
          </UiAlert>
        )}
        <DashboardTopNav />
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
  .alert-container {
    padding: ${pxToRem(16)};
  }
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

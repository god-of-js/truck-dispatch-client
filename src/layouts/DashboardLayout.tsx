import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import { getDashboardUser, getUsers } from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import Loader from 'components/layout/Loader';
import UiAlert from 'ui/UiAlert';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { getUsersChat, setChat } from 'modules/Chat';
import { WEB_SOCKET_URL } from 'utils/privateKeys';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.account.user);

  useEffect(() => {
    const userId = localStorage.getItem('uid');
    if (!userId) {
      navigate('/auth/login');
    } else {
      dispatch(toAnyAction(getDashboardUser()))
        .catch((err: Error) => {
          Toast.error({ msg: err.message });
        })
        .finally(() => setLoading(false));
      // Would be removed when the backend is ready.
      dispatch(toAnyAction(getUsers()));
      dispatch(toAnyAction(getUsersChat(userId)));
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('uid');
    if (userId) {
      const newSocket = io(WEB_SOCKET_URL);
      newSocket.on('connect', () => {
        newSocket.emit('join', { userId });
      });

      newSocket.on('message', (message) => {
        console.log(message)
        dispatch(setChat(message));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const Component = loading ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
  return (
    <Layout>
      <DashboardSidebar />
      <Body>
        {!user?.avatar && (
          <UiAlert variant="warning">
            Kindly upload a profile image to foster trust between you and other
            individuals you may work with. To upload a profile picture,{' '}
            <Link to="/profile">Click Here</Link>
          </UiAlert>
        )}
        {location.pathname !== '/profile/verification' && (
          <div>
            {user?.status === 'unverified' && (
              <UiAlert variant="warning">
                Verification is required to access all core features of the
                application. To complete verification,{' '}
                <Link to="/profile/verification">Click Here</Link>
              </UiAlert>
            )}
            {user?.status === 'pending_verification' && (
              <UiAlert variant="info">
                Your verification has been sent to the admin. Expect to get a
                text about the status of your verification within 3 working
                days.
              </UiAlert>
            )}
            {user?.status === 'rejected' && (
              <UiAlert variant="danger">
                Your verification request was rejected. Kindly proceed back to
                the <Link to="/profile/verification">Verification Page</Link> to
                view why it was rejected and fix the issue.
              </UiAlert>
            )}
          </div>
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
  padding-bottom: ${pxToRem(48)};
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

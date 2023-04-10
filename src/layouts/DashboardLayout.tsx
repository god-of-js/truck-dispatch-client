import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import { getDashboardUser } from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiAlert from 'ui/UiAlert';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { getChatLogs, getUserChat, setChat, setChatLog } from 'modules/Chat';
import { WEB_SOCKET_URL } from 'utils/privateKeys';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.account.user);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      navigate('/auth/login');
    } else {
      dispatch(toAnyAction(getDashboardUser())).catch((err: Error) => {
        Toast.error({ msg: err.message });
      });
      dispatch(toAnyAction(getUserChat()));
      dispatch(toAnyAction(getChatLogs()));
    }
  }, []);

  useEffect(() => {
    const userId = user?._id;
    if (userId) {
      const newSocket = io(WEB_SOCKET_URL);
      newSocket.on('connect', () => {
        newSocket.emit('join', { userId });
      });

      newSocket.on('message', (message) => {
        dispatch(setChat(message));
      });

      newSocket.on('chat-log', (chatLog) => {
        dispatch(setChatLog(chatLog));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

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

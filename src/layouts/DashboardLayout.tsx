import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import {
  getDashboardUser,
  requestEmailVerification,
  verifyEmail,
} from 'modules/Account';

import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { getChatLogs, getUserChat, setChat, setChatLog } from 'modules/Chat';
import { WEB_SOCKET_URL } from 'utils/privateKeys';
import { saveUserSessionId } from 'utils/localStorageMethods';

const DashboardSidebar = lazy(
  () => import('components/layout/DashboardSidebar'),
);
const EmailHasBeenSentModal = lazy(
  () => import('components/profile/EmailHasBeenSentModal'),
);
const Loader = lazy(() => import('components/layout/Loader'));
const EmailHasBeenVerifiedModal = lazy(
  () => import('components/profile/EmailHasBeenVerifiedModal'),
);

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get('token');
  const action = new URLSearchParams(location.search).get('action');
  const isPhoneVerified = new URLSearchParams(location.search).get(
    'isPhoneVerified',
  );

  const [requestVerificationLoading, setRequestVerificationLoading] =
    useState(false);
  const [verificationHasBeenSent, setVerificationHasBeenSent] = useState(false);
  const [emailHasBeenVerified, setEmailHasBeenVerified] = useState(false);
  const user = useSelector((state: RootState) => state.account.user);
  const [loading, setLoading] = useState(true);

  function getEmailVerificationLink() {
    setRequestVerificationLoading(true);
    dispatch(toAnyAction(requestEmailVerification()))
      .then(() => {
        setVerificationHasBeenSent(true);
      })
      .finally(() => setRequestVerificationLoading(false));
  }

  function verifyUserEmail(verificationToken: string) {
    setLoading(true);
    dispatch(toAnyAction(verifyEmail(verificationToken)))
      .then(() => {
        navigate(location.pathname);
        setEmailHasBeenVerified(true);
      })
      .finally(() => setLoading(false));
  }

  function loadDashboardData() {
    dispatch(toAnyAction(getDashboardUser()))
      .catch((err: Error) => {
        Toast.error({ msg: err.message });
      })
      .then(() => setLoading(false));
    dispatch(toAnyAction(getUserChat()));
    dispatch(toAnyAction(getChatLogs()));
  }

  useEffect(() => {
    if (action === 'sign-in' && token) {
      // Sign in user by saving the session ID
      saveUserSessionId(token);
      navigate(
        `${location.pathname}${
          isPhoneVerified === 'false'
            ? '?isPhoneVerified=' + isPhoneVerified
            : ''
        }`,
      );
    } else if (action === 'verify-email' && token) {
      verifyUserEmail(token);
    }
  }, [action, token, isPhoneVerified]);

  useEffect(() => {
    if (action !== 'sign-in' && !token) {
      loadDashboardData();
    }
  }, [action, token, loading]);

  useEffect(() => {
    // Connect to socket.
    if (user) {
      const userId = user?._id;
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
        {loading ? <Loader isPage /> : <Outlet />}
        <EmailHasBeenSentModal
          isVisible={verificationHasBeenSent}
          onClose={() => setVerificationHasBeenSent(false)}
        />
        <EmailHasBeenVerifiedModal
          isVisible={emailHasBeenVerified}
          onClose={() => setEmailHasBeenVerified(false)}
        />
      </Body>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--color-gray-20);
  overflow: hidden;
`;

const Body = styled.div`
  position: relative;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 100px;

  .alert-container {
    padding: 16px;
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 97%;
    border-top: none;
    position: static;
    border-right: 1px solid var(--color-gray-200);
    padding-bottom: 0;
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 95%;
  }
`;

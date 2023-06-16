import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import {
  getDashboardUser,
  requestEmailVerification,
  setUser,
  verifyEmail,
} from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { getChatLogs, getUserChat, setChat, setChatLog } from 'modules/Chat';
import { WEB_SOCKET_URL } from 'utils/privateKeys';
import EmailHasBeenSentModal from 'components/profile/EmailHasBeenSentModal';
import Loader from 'components/layout/Loader';
import EmailHasBeenVerifiedModal from 'components/profile/EmailHasBeenVerifiedModal';
import { getUserSessionId, saveUserSessionId } from 'utils/localStorageMethods';

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
      .catch(() => {
        navigate('/auth/login');
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
    const sessionId = getUserSessionId();
    if (!sessionId && action !== 'sign-in' && !token) {
      navigate('/auth/login');
      dispatch(setUser(null));
      window.location.reload();
    } else {
      loadDashboardData();
    }
  }, [action, token, loading]);

  useEffect(() => {
    if (location.pathname === '/') navigate('/my-trips');
  }, [location.pathname]);

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
  padding-bottom: ${pxToRem(100)};
  /* padding: 0 ${pxToRem(24)}; */
  .alert-container {
    padding: ${pxToRem(16)};
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 97%;
    border-top: none;
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
    padding-bottom: 0;
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 95%;
  }
`;

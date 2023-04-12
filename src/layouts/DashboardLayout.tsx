import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import {
  getDashboardUser,
  requestEmailVerification,
  verifyEmail,
} from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiAlert from 'ui/UiAlert';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { getChatLogs, getUserChat, setChat, setChatLog } from 'modules/Chat';
import { WEB_SOCKET_URL } from 'utils/privateKeys';
import UiButton from 'ui/UiButton';
import UiOverlay from 'ui/UiOverlay';
import EmailHasBeenSentModal from 'components/profile/EmailHasBeenSentModal';
import Loader from 'components/layout/Loader';
import EmailHasBeenVerifiedModal from 'components/profile/EmailHasBeenVerifiedModal';
import { getUserSessionId, saveUserSessionId } from 'utils/userSession';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get('token');
  const action = new URLSearchParams(location.search).get('action');

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

  useEffect(() => {
    if (action === 'sign-in' && token) {
      saveUserSessionId(token);
    } else if (action === 'verify-email' && token) {
      setLoading(true);
      dispatch(toAnyAction(verifyEmail(token)))
        .then(() => {
          setEmailHasBeenVerified(true);
        })
        .finally(() => setLoading(false));
    }
  }, [action, token]);

  useEffect(() => {
    const sessionId = getUserSessionId();
    if (!sessionId && action !== 'sign-in' && !token) {
      navigate('/auth/login');
    } else {
      dispatch(toAnyAction(getDashboardUser()))
        .catch((err: Error) => {
          Toast.error({ msg: err.message });
        })
        .then(() => setLoading(false));
      dispatch(toAnyAction(getUserChat()));
      dispatch(toAnyAction(getChatLogs()));
    }
  }, [action, token, loading]);

  useEffect(() => {
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
        {!user?.isEmailVerified && (
          <UiAlert variant="warning">
            Your email address has not been verified. To have full access to the
            dashboard{' '}
            <UiButton
              size="s"
              variant="warning-text"
              onClick={getEmailVerificationLink}
              loading={requestVerificationLoading}
            >
              Verify your account
            </UiButton>
          </UiAlert>
        )}
        <DashboardTopNav />
        {loading ? <Loader /> : <Outlet />}
        <UiOverlay isVisible={verificationHasBeenSent}>
          <EmailHasBeenSentModal
            onClose={() => setVerificationHasBeenSent(false)}
          />
        </UiOverlay>
        <UiOverlay isVisible={emailHasBeenVerified}>
          <EmailHasBeenVerifiedModal
            onClose={() => setEmailHasBeenVerified(false)}
          />
        </UiOverlay>
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

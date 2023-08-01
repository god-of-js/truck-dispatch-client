import React, { lazy, useEffect, useState } from 'react';
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

import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { getChatLogs, getUserChat, setChat, setChatLog } from 'modules/Chat';
import { WEB_SOCKET_URL } from 'utils/privateKeys';
import { saveUserSessionId } from 'utils/localStorageMethods';
import Trip from 'types/Trip';
import { removeTrip, setTrip } from 'modules/Trips';
import { removeBid, setBid } from 'modules/Bid';
import Bid from 'types/Bid';

const DashboardSidebar = lazy(
  () => import('components/layout/DashboardSidebar'),
);
const UiAlert = lazy(() => import('components/ui/UiAlert'));
const UiButton = lazy(() => import('components/ui/UiButton'));
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
    if (action === 'verify-email' && token) {
      verifyUserEmail(token);
    }
  }, [action, token]);

  useEffect(() => {
    loadDashboardData();
  }, [loading]);

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

      newSocket.on('trip-details', (trip: Trip) => {
        dispatch(setTrip(trip));
      });

      newSocket.on('remove-trip', (tripId: string) => {
        dispatch(removeTrip(tripId));
      });

      newSocket.on('bid-details', (bid: Bid) => {
        console.log(bid);
        dispatch(setBid(bid));
      });

      newSocket.on('remove-bid', (tripId: string) => {
        dispatch(removeBid(tripId));
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
        {!!user?.status && user?.status !== 'verified' ? (
          <div className="alert-container">
            <UiAlert variant="warning" alignCenter isClosable>
              <div className="alert-body">
                <span className="text">
                  Kindly{' '}
                  <Link to="/transporter-verification">
                    complete your verification
                  </Link>{' '}
                  to be able to bid on jobs
                </span>
                <Link
                  to="/transporter-verification"
                  className="no-text-decoration"
                >
                  <UiButton variant="secondary" size="s">
                    Complete Verification
                  </UiButton>
                </Link>
              </div>
            </UiAlert>
          </div>
        ) : (
          ''
        )}
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
    .ui-alert {
      margin: 16px 16px 0 16px;
    }

    .text {
      font-size: 14px;
      font-weight: 600;
      line-height: 140%;
      letter-spacing: -0.4px;
    }

    .alert-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .no-text-decoration {
      text-decoration: none;
    }
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

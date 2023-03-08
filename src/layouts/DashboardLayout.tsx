import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { toAnyAction } from 'utils/helpers';
import sizes from '../utils/sizes';

import { getUsers, selectDashboardUser } from 'modules/Account';

import DashboardSidebar from 'components/layout/DashboardSidebar';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import Loader from 'components/layout/Loader';
import UiAlert from 'ui/UiAlert';
import { setChats } from 'modules/Chat';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import db from '../api/firebase';
import Chat from 'types/Chat';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectDashboardUser);

  useEffect(() => {
    const userId = localStorage.getItem('uid');
    if (!userId) {
      navigate('/auth/login');
    } else {
      dispatch(toAnyAction(getUsers()))
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => setLoading(false));
    }
  });

  // useLayoutEffect(() => {
  //   let unsubscribe: () => void;

  //   if (user?.id) {
  //     const key = user.userType === 'agent' ? 'agentId' : 'transporterId';
  //     const q = query(collection(db, 'chat'), where(key, '==', user.id));

  //     unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const chats: Chat[] = [];
  //       querySnapshot.forEach((doc) => {
  //         chats.push(doc.data() as Chat);
  //       });
  //       dispatch(setChats(chats));
  //     });
  //   }

  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [user]);

  const Component = loading ? (
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
        {!user?.avatar && 
              <UiAlert variant="warning">
                Kindly upload a profile image to foster trust between you and other individuals you may work with.
                To upload a profile picture, 
                <Link to="/dashboard/profile">Click Here</Link>
              </UiAlert>}
        {location.pathname !== '/dashboard/profile/verification' && (
          <div>
            {user?.status === 'unverified' && (
              <UiAlert variant="warning">
                Verification is required to access all core features of the
                application. To complete verification,{' '}
                <Link to="/dashboard/profile/verification">Click Here</Link>
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
                the <Link to="/dashboard/profile/verification">Verification Page</Link> to
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

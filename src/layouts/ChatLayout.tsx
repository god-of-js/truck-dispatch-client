import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ChatHeads from 'components/chat/ChatHeads';
import sizes from 'utils/sizes';
import { useDispatch, useSelector } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { getChats } from 'modules/Chat';
import { selectDashboardUser } from 'modules/Account';
import { collection, query } from 'firebase/firestore';

export default function ChatLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectDashboardUser);

  useEffect(() => {
    // const q = query(
    //   collection(db, 'chat'),
    //   where(key, condition, value),
    //   );
    //   onSnapshot(q, (querySnapshot) => {
    //   const docs: T[] = [];
    //   querySnapshot.forEach((doc) => {
    //     docs.push(doc.data() as T);
    //   });
    // });
    Promise.all([
      dispatch(
        toAnyAction(
          getChats(
            user?.id!,
            user?.userType === 'agent' ? 'agentId' : 'transporterId',
          ),
        ),
      ),
    ]);
  });

  return (
    <ChatLayoutDesign>
      <div className="card">
        <div className="chat-heads-container">
          <ChatHeads />
        </div>
        <div className="outlet-container" key={location.pathname}>
          <Outlet />
          {location.pathname === '/chat' && (
            <div className="create-message-"></div>
          )}
        </div>
        <div className="mobile-display">
          {location.pathname === '/chat' && <ChatHeads />}

          <Outlet key={location.pathname} />
        </div>
      </div>
    </ChatLayoutDesign>
  );
}

const ChatLayoutDesign = styled.div`
  padding-top: ${pxToRem(24)};
  height: 85vh;

  .card {
    background: var(--color-gray-100);
    width: 90%;
    height: 100%;
    margin: auto;
    border: 1px solid var(--color-gray-200);
    border-radius: ${pxToRem(8)};
    color: var(--color-gray-600);
    display: flex;
    overflow: hidden;

    .chat-heads-container {
      display: none;
      width: 30%;
      border-right: 1px solid var(--color-gray-200);
      @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
        display: block;
      }
    }

    .mobile-display {
      display: block;
      width: 100%;

      @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
        display: none;
      }
    }
  }

  .outlet-container {
    display: none;
    width: 70%;
    @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
      display: block;
    }
  }
`;

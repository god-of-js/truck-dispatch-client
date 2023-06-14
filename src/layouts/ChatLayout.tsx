import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatHeads from 'components/chat/ChatHeads';
import sizes from 'utils/sizes';
import { useDispatch } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { createOrFetchChatLog } from 'modules/Chat';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiConfirmModal from 'ui/UiConfirmModal';
import Loader from 'components/layout/Loader';

export default function ChatLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = new URLSearchParams(location.search).get('clientId');
  const transporterId = new URLSearchParams(location.search).get(
    'transporterId',
  );
  const [chatLogCreationInProgress, setChatLogCreationInProgress] =
    useState(false);
  async function createCallLog() {
    if (clientId && transporterId && !chatLogCreationInProgress) {
      setChatLogCreationInProgress(true);
      const log = await dispatch(
        toAnyAction(createOrFetchChatLog({ clientId, transporterId })),
      );

      if (log) navigate(`/chat/${log._id}`);
      setChatLogCreationInProgress(false);
    }
  }
  useEffect(() => {
    createCallLog();
  }, [clientId, transporterId, chatLogCreationInProgress]);

  return (
    <>
      <DashboardTopNav routeName="Chat" />
      <ChatLayoutDesign>
        <div className="card">
          <div className="chat-heads-container">
            <ChatHeads />
          </div>
          <div className="outlet-container" key={location.pathname}>
            <Outlet />
            {location.pathname === '/chat' && (
              <div className="create-message"></div>
            )}
          </div>
          <div className="mobile-display">
            {location.pathname === '/chat' && <ChatHeads />}

            <Outlet key={location.pathname} />
          </div>
        </div>
      </ChatLayoutDesign>
      <UiConfirmModal
        title="Chat Loading"
        isVisible={chatLogCreationInProgress}
        hideActions
        hideModalClose
        onClose={() => setChatLogCreationInProgress(false)}
      >
        Chat log creation in progress <Loader />
      </UiConfirmModal>
    </>
  );
}

const ChatLayoutDesign = styled.div`
  padding: ${pxToRem(12)} ${pxToRem(24)};
  height: 85vh;

  .card {
    background: var(--color-gray-10);
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

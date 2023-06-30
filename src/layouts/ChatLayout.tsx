import React, { lazy, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import { useDispatch } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { createOrFetchChatLog } from 'modules/Chat';

const Loader = lazy(() => import('components/layout/Loader'));
const UiConfirmModal = lazy(() => import('ui/UiConfirmModal'));
const UiCard = lazy(() => import('ui/UiCard'));
const DashboardTopNav = lazy(() => import('components/layout/DashboardTopNav'));
const ChatHeads = lazy(() => import('components/chat/ChatHeads'));

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
        <UiCard>
          <div className="large-screen-view">
            <div className="chat-heads-container">
              <ChatHeads />
            </div>
            <div className="outlet-container" key={location.pathname}>
              <Outlet />
            </div>
          </div>
          <div className="mobile-view">
            {location.pathname === '/chat' && <ChatHeads />}

            <Outlet key={location.pathname} />
          </div>
        </UiCard>
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
  padding: 0 ${pxToRem(24)};
  .ui-card {
    padding: 0;

    .large-screen-view {
      display: none;
      .chat-heads-container {
        width: 30%;
        height: 85vh;
        overflow: hidden;
        min-width: ${pxToRem(333)};
      }

      .outlet-container {
        height: 85vh;
        width: 70%;
        overflow: hidden;
      }
    }
    .mobile-view {
      display: block;
      height: 85vh;
    }

    @media screen and (min-width: ${sizes.tabletMidWidth}) {
      .large-screen-view {
        display: flex;
      }

      .mobile-view {
        display: none;
      }
    }
  }
`;

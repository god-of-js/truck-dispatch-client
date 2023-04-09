import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatHeads from 'components/chat/ChatHeads';
import sizes from 'utils/sizes';
import { useDispatch } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { createOrFetchChatLog } from 'modules/Chat';
import ChatLog from 'types/ChatLog';

export default function ChatLayout() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clientId = new URLSearchParams(location.search).get('clientId');
  const transporterId = new URLSearchParams(location.search).get('transporterId');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (clientId && transporterId) {
      setIsLoading(false)
      dispatch(toAnyAction(createOrFetchChatLog({ clientId, transporterId }))).then((log: ChatLog) => {
        console.log(log)
        navigate(`/chat/${log._id}`)
      })
    }
  }, [clientId, transporterId])

  return (
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

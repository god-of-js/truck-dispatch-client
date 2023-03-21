import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import { selectChatHeads } from 'modules/Chat';
import UiAvatar from 'ui/UiAvatar';
import Chat from 'types/Chat';

export default function ChatHeads() {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.account.users);
  const user = useSelector((state: RootState) => state.account.user);
  const chatHeads = useSelector(selectChatHeads);

  function alternateUser(chat: Chat) {
    const alternateUserId =
      user?.id === chat.receiverId ? chat.senderId : chat.receiverId;
    const foundUser = users.find(({ id }) => id === alternateUserId);
    if (!foundUser) throw new Error('user does not exist');
    return foundUser;
  }

  function navigateToChat(agentId: string, transporterId: string) {
    navigate(`/chat/${agentId}/${transporterId}`);
  }

  return (
    <ChatHeadsList>
      {chatHeads.map((val, index) => (
        <ChatHead
          key={index}
          hasBeenRead={!!val.readAt || val.senderId === user?.id}
          onClick={() => navigateToChat(val.agentId, val.transporterId)}
        >
          <UiAvatar avatar={alternateUser(val).avatar} />
          <div className="content-container">
            <div className="name">{`${alternateUser(val).firstName} ${
              alternateUser(val).lastName
            }`}</div>
            <div className="last-text">{val.message}{`${val.readAt}`}</div>
          </div>
        </ChatHead>
      ))}
    </ChatHeadsList>
  );
}

const ChatHeadsList = styled.ul`
  padding: 0;
  position: relative;
  background: #ffffff;
  margin: 0;
  list-style-type: none;
  width: 100%;
  height: 100%;
`;

const ChatHead = styled.li`
  padding: ${pxToRem(12)};
  gap: ${pxToRem(12)};
  border-bottom: 1px solid var(--color-gray-200);
  background: ${({ hasBeenRead }: { hasBeenRead: boolean }) =>
    !hasBeenRead && 'var(--color-gray-100);'};
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  &:last-child {
    border-bottom: transparent;
  }

  .content-container {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .name {
    font-size: ${pxToRem(16)};
    font-weight: bold;
  }

  .last-text {
    font-size: ${pxToRem(14)};
    font-weight: 400;
    color: var(--color-gray-500);
    flex: 1;
  }
  :hover {
    background: var(--color-gray-50);
  }
`;

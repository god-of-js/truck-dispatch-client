import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import UiAvatar from 'ui/UiAvatar';
import ChatLog from 'types/ChatLog';

export default function ChatHeads() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  const chatLogs = useSelector((state: RootState) => state.chat.chatLogs);

  function getTime(createdAt: number) {
    return new Date(createdAt).getTime();
  }
  const chatLogsWithContent = useMemo(() => {
    return chatLogs
      .filter((log) => !!log.lastMessage)
      .sort(
        (a, b) =>
          getTime(b.lastMessage.createdAt!) - getTime(a.lastMessage.createdAt!),
      );
  }, [chatLogs]);

  function alternateUser(log: ChatLog) {
    return user?._id === log.transporter._id ? log.client : log.transporter;
  }

  function navigateToChat(chatLog: string) {
    navigate(`/chat/${chatLog}`);
  }

  return (
    <ChatHeadsList>
      {chatLogsWithContent.map((log, index) => (
        <ChatHead
          key={index}
          hasBeenRead={
            !!log.lastMessage?.readAt || log.lastMessage?.sender === user?._id
          }
          onClick={() => navigateToChat(log._id)}
        >
          <UiAvatar avatar={alternateUser(log)?.avatar} />
          <div className="content-container">
            <div className="name">
              {alternateUser(log)
                ? `${alternateUser(log).firstName} ${
                    alternateUser(log).lastName
                  }`
                : 'Truckdispatch User'}
            </div>
            <div className="last-text">{log.lastMessage?.message}</div>
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
  padding:12px;
  gap: 12px;
  border-bottom: 1px solid var(--color-gray-200);
  background: ${({ hasBeenRead }: { hasBeenRead: boolean }) =>
    !hasBeenRead && 'var(--color-gray-10);'};
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
    font-size:16px;
    font-weight: bold;
  }

  .last-text {
    font-size:14px;
    font-weight: 400;
    color: var(--color-gray-500);
    flex: 1;
  }
  :hover {
    background: var(--color-gray-50);
  }
`;

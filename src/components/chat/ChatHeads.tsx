import React, { lazy, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { RootState } from 'modules/index';
import ChatLog from 'types/ChatLog';

const UserDetails = lazy(() => import('ui/UserDetails'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiSelect = lazy(() => import('ui/UiSelect'));

export default function ChatHeads() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  const chatLogs = useSelector((state: RootState) => state.chat.chatLogs);
  const [filterCategory, setFilterCategory] = useState('latest');

  const filterOptions = [
    {
      value: 'latest',
      label: 'Latest',
    },
    {
      value: 'unread',
      label: 'Unread',
    },
  ];
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
  function setFilter() {}

function formatTime(timestamp: number) {
  const currentTime = moment();
  const messageTime = moment(timestamp);
  const diffInDays = currentTime.diff(messageTime, 'days');

  if (diffInDays === 0) {
    // Same day
    return messageTime.format('h:mm A');
  } else if (diffInDays === 1) {
    // Yesterday
    return 'Yesterday';
  } else if (diffInDays < 7) {
    // Same week but not yesterday
    return messageTime.format('dddd');
  } else {
    // More than a week ago
    return messageTime.format('DD/MM/YYYY');
  }
}
  return (
    <ChatHeadsContainer>
      <header className="chat-heads-header">
        <div className="filter">
          <span>Filter: </span>
          <div className="select-container">
            <UiSelect
              size="s"
              value={filterCategory}
              name="filterCategory"
              options={filterOptions}
              onChange={setFilter}
            />
          </div>
        </div>
        <UiButton variant="icon-neutral" size="s">
          <UiIcon icon="Search" />
        </UiButton>
      </header>
      {!chatLogsWithContent.length && (
        <div className="empty-chat-list">
          <p>
            Your messages would show up here when you get one, or you can start
            one
          </p>
          <UiButton>Start Chat</UiButton>
        </div>
      )}
      <ChatHeadsList>
        {chatLogsWithContent.map((log, index) => (
          <ChatHead
            key={index}
            hasBeenRead={
              !!log.lastMessage?.readAt || log.lastMessage?.sender === user?._id
            }
            onClick={() => navigateToChat(log._id)}
          >
            <div className="content">
              <UserDetails
                avatar={alternateUser(log)?.avatar}
                userName={
                  alternateUser(log)
                    ? `${alternateUser(log).firstName} ${
                        alternateUser(log).lastName
                      }`
                    : 'Truckdispatch User'
                }
                hideProfileSubtitle
              />
              <p>{log.lastMessage.message}</p>
            </div>
            <div className="extra-info">
              <div className="time">
                {formatTime(log.lastMessage.createdAt!)}
              </div>
              <UiIcon icon="DoubleTick" size="20" />
            </div>
          </ChatHead>
        ))}
      </ChatHeadsList>
    </ChatHeadsContainer>
  );
}

const ChatHeadsContainer = styled.div`
  border-right: ${pxToRem(1)} solid var(--color-gray-30);
  height: 100%;
  .chat-heads-header {
    height: ${pxToRem(64)};
    border-bottom: ${pxToRem(1)} solid var(--color-gray-30);
    padding: ${pxToRem(16)};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filter {
      display: flex;
      align-items: center;
      gap: ${pxToRem(8)};

      span {
        font-weight: 600;
        font-size: ${pxToRem(12)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-gray-80);
      }

      .select-container {
        min-width: ${pxToRem(140)};

        .ui-select {
          .select {
            background: var(--color-gray-30);
            border: transparent;
          }
        }
      }
    }
  }
  .empty-chat-list {
    font-weight: 400;
    font-size: ${pxToRem(20)};
    line-height: 140%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 60%;
    letter-spacing: -0.02em;
    color: var(--color-gray-70);
    max-width: ${pxToRem(280)};
    margin: auto;
    p {
      padding: ${pxToRem(24)} 0;
    }
    button {
      width: ${pxToRem(182)};
    }
  }
`;
const ChatHeadsList = styled.ul`
  padding: ${pxToRem(10)} ${pxToRem(16)};
  box-sizing: border-box;
  position: relative;
  margin: 0;
  list-style-type: none;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ChatHead = styled.li`
  padding: ${pxToRem(12)};
  border-radius: ${pxToRem(8)};
  margin-bottom: ${pxToRem(4)};
  border-bottom: 1px solid var(--color-gray-200);
  background: ${({ hasBeenRead }: { hasBeenRead: boolean }) =>
    !hasBeenRead && 'var(--color-primary-10);'};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:last-child {
    border-bottom: transparent;
  }

  p {
    font-weight: 600;
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(20)};
    color: var(--color-gray-70);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-height: 1.4;
    max-height: 2.8em;
    margin: 0;
    padding: ${pxToRem(8)} 0 0 0;
  }

  .extra-info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-end;

    .time {
      font-weight: 600;
      font-size: ${pxToRem(10)};
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      white-space: nowrap;
    }
  }
  :hover {
    background: var(--color-primary-10);
  }
`;

import React, { lazy, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { RootState } from 'modules/index';

import {
  selectChatBychatLog,
  createChat,
  readChat,
  selectChatLog,
} from 'modules/Chat';

import { toAnyAction } from 'utils/helpers';

import Chat from 'types/Chat';

import ChatSchema from 'utils/validations/ChatSchema';
import User from 'types/User';
import uuidv4 from 'utils/uuid';
import sizes from 'utils/sizes';

const UiForm = lazy(() => import('ui/UiForm'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UserDetails = lazy(() => import('ui/UserDetails'));
const UiButton = lazy(() => import('ui/UiButton'));

export default function ChatPage() {
  const { chatLogId } = useParams();
  const dispatch = useDispatch();
  const chatBottomRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.account.user);
  const chatLog = useSelector(selectChatLog(chatLogId!));
  const chats = useSelector(selectChatBychatLog(chatLogId!));

  const defaultFormData = {
    message: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [currentLengthOfChats, setCurrentLengthOfChats] = useState(0);

  const alternateUser = useMemo(() => {
    if (!chatLog || !user) return {} as User;
    if (chatLog?.client._id === user?._id) {
      return chatLog?.transporter;
    }

    return chatLog?.client;
  }, [chatLog, user]);

  function updateMessage(e: { target: { value: string } }) {
    setFormData({ message: e.target.value });
  }

  function sendMessage() {
    const data: Chat = {
      // Temporary ID
      _id: uuidv4(),
      chatLog: chatLogId!,
      message: formData.message,
      sender: user?._id!,
      receiver: alternateUser?._id!,
      createdAt: Date.now(),
    };

    setFormData(defaultFormData);
    dispatch(toAnyAction(createChat(data)));
  }

  function initReadChat() {
    const lastSentChat = chats[chats.length - 1];
    if (
      lastSentChat &&
      lastSentChat.sender !== user?._id &&
      !lastSentChat.readAt
    ) {
      dispatch(toAnyAction(readChat({ ...lastSentChat, readAt: Date.now() })));
    }
  }

  function getTime(timestamp: number) {
    return moment(timestamp).format('hh:mmA');
  }

  useEffect(() => {
    const element = chatBottomRef.current;
    if (element) {
      // 👇 Will scroll smoothly to the bottom of the chat window
      // @ts-ignore
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  useEffect(() => {
    if (chats.length > currentLengthOfChats) {
      setCurrentLengthOfChats(chats.length);
      initReadChat();
    }
  }, [chats]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ChatPageStyling>
      <Header>
        <Link to="/chat" className="go-back-link">
          <UiButton variant="icon-neutral" size="s">
            <UiIcon icon="CaretLeft" /> <span>Chats</span>
          </UiButton>
        </Link>
        <UserDetails
          avatar={alternateUser.avatar}
          userName={`${alternateUser.firstName} ${alternateUser.lastName}`}
          showViewProfile
        />
      </Header>

      <ChatContainer>
        <div id="chat-window" className="chat-window">
          <div className="beginning-of-chat-msg">
            This is the beginning of your chat with{' '}
            <UiButton
              variant="secondary"
              size="s"
              textCasing="capitalize"
            >{`${alternateUser.firstName} ${alternateUser.lastName}`}</UiButton>
          </div>
          {chats.map((chat, index) => (
            <ChatBubble isMine={chat.sender === user?._id} key={index}>
              <div className="chat-bubble-inner">{chat.message}</div>
              <div className="time-sent">
                {chat.createdAt && getTime(chat.createdAt!)}
              </div>
            </ChatBubble>
          ))}
        </div>
        <div ref={chatBottomRef} />
      </ChatContainer>
      {alternateUser && (
        <InputContainer>
          <UiForm
            formData={formData}
            schema={ChatSchema}
            onSubmit={sendMessage}
          >
            {({ errors }) => (
              <div className="input-group">
                {errors.message && (
                  <div className="error-message-container">
                    {errors.message}
                  </div>
                )}
                <div className="inner">
                  <div className="input-container">
                    <input
                      ref={inputRef}
                      placeholder="Start typing your message"
                      value={formData.message}
                      onChange={updateMessage}
                    />
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      className="send-btn"
                      disabled={!formData.message}
                    >
                      <UiIcon icon="PaperPlaneTilt" size="20" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </UiForm>
        </InputContainer>
      )}
    </ChatPageStyling>
  );
}

const ChatPageStyling = styled.div`
  position: relative;
  height: 100%;
`;

const Header = styled.header`
  padding: ${pxToRem(12)};
  height: ${pxToRem(64)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  border-top-right-radius: ${pxToRem(8)};
  border-bottom: ${pxToRem(1)} solid var(--color-gray-30);
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  @media screen and (min-width: ${sizes.tabletMidWidth}) {
    .go-back-link {
      display: none;
    }
  }
`;

const ChatContainer = styled.div`
  padding: ${pxToRem(18)};
  height: 80%;
  overflow: auto;

  .chat-window {
    background: var(--color-gray-20);
    min-height: 100%;
    border-radius: ${pxToRem(8)};
    padding: ${pxToRem(12)};

    .beginning-of-chat-msg {
      width: fit-content;
      display: flex;
      flex-direction: column;
      margin: ${pxToRem(8)} auto;
      align-items: center;
      background: white;
      padding: ${pxToRem(4)} ${pxToRem(8)};
      border-radius: ${pxToRem(8)};
      gap: ${pxToRem(6)};
      font-weight: 400;
      font-size: ${pxToRem(12)};
      line-height: ${pxToRem(20)};
      color: var(--color-gray-100);
    }
  }

  @media screen and (min-width: ${sizes.mobileSmall}) {
    .chat-window {
      .beginning-of-chat-msg {
        flex-direction: row;
      }
    }
  }
`;

const ChatBubble = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : '')};
  .chat-bubble-inner {
    padding: ${pxToRem(8)};
    margin: ${pxToRem(2)} 0;
    border-radius: ${pxToRem(8)};
    background: white;
    width: fit-content;
    color: var(--color-neutralBlack);
    max-width: 70%;
    font-weight: 400;
    font-size: ${pxToRem(14)};
    line-height: ${pxToRem(20)};
  }
  .time-sent {
    font-weight: 600;
    font-size: ${pxToRem(10)};
    line-height: ${pxToRem(20)};
    color: var(--color-gray-70);
  }
`;

const InputContainer = styled.div`
  background: white;
  padding: 0 ${pxToRem(18)} ${pxToRem(18)} ${pxToRem(18)};
  z-index: 1;

  .error-message-container {
    font-size: ${pxToRem(14)};
    color: var(--color-danger);
    padding: ${pxToRem(4)};
    background: white;
    border-top-left-radius: ${pxToRem(4)};
    border-top-right-radius: ${pxToRem(4)};
    border: 1px solid var(--color-gray-200);
    border-bottom: transparent;
  }
  .inner {
    display: flex;
    height: ${pxToRem(60)};
    overflow: hidden;
    background: white;
    margin-bottom: ${pxToRem(12)};
    border: 1px solid var(--color-gray-30);
    border-radius: ${pxToRem(50)};
    .input-container {
      width: 100%;
      padding: ${pxToRem(12)};
      display: flex;
      align-items: center;
      input {
        width: 100%;
        border: transparent;
        background: transparent;
        outline: transparent;
        font-size: ${pxToRem(14)};
      }
    }
    .btn-container {
      border-left: ${pxToRem(1)} solid var(--color-gray-30);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${pxToRem(10)};
      box-sizing: border-box;
      .send-btn {
        background: var(--color-primary);
        border: transparent;
        outline: none;
        cursor: pointer;
        padding: ${pxToRem(4)};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: ${pxToRem(44)};
        height: ${pxToRem(44)};

        svg {
          fill: white;
        }

        &:hover {
          box-shadow: var(--box-shadow-primary);
        }
      }
    }
  }
`;

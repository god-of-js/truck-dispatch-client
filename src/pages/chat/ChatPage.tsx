import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from 'modules/index';

import {
  selectChatBychatLog,
  createChat,
  readChat,
  selectChatLog,
} from 'modules/Chat';

import { toAnyAction } from 'utils/helpers';

import Chat from 'types/Chat';

import UiAvatar from 'ui/UiAvatar';
import UiIcon from 'ui/UiIcon';
import UiForm from 'ui/UiForm';
import ChatSchema from 'utils/validations/ChatSchema';
import User from 'types/User';
import uuidv4 from 'utils/uuid';

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
        <div className="user-details">
          {/* TODO: Add Loaders to the avatar */}
          <UiAvatar avatar={alternateUser?.avatar} />
          <div>{`${alternateUser?.firstName || ''} ${
            alternateUser?.lastName || ''
          }`}</div>
        </div>
      </Header>

      <ChatContainer>
        <div id="chat-window">
          {chats.map((chat, index) => (
            <ChatBubble isMine={chat.sender === user?._id} key={index}>
              <div className="chat-bubble-inner">{chat.message}</div>
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
                  <input
                    ref={inputRef}
                    placeholder="Enter Message"
                    value={formData.message}
                    onChange={updateMessage}
                  />
                  <button type="submit" disabled={!formData.message}>
                    {/* <UiIcon icon="PaperPlaneTilt" /> */}
                  </button>
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
  padding: 0 24px;
`;

const Header = styled.header`
  padding:12px;
  border-bottom: 1px solid var(--color-gray-20);
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .user-details {
    display: flex;
    align-items: center;
    gap:12px;
  }
`;

const ChatContainer = styled.div`
  padding:80px 32px 80px 32px;
  background: var(--color-gray-10);
  height: 80%;
  overflow: scroll;
`;

const ChatBubble = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : '')};
  .chat-bubble-inner {
    padding:8px;
    margin:2px 0;
    border-radius:4px;
    background: ${({ isMine }) =>
      isMine ? 'var(--color-primary)' : 'var(--color-gray-70)'};
    width: fit-content;
    color: white;
    max-width: 70%;
  }
`;

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  padding-bottom:16px;
  z-index: 1;

  .input-group {
    width: 90%;
    margin: auto;
  }
  .error-message-container {
    font-size:14px;
    color: var(--color-danger);
    padding:4px;
    background: white;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    border: 1px solid var(--color-gray-200);
    border-bottom: transparent;
  }
  .inner {
    padding:12px;
    display: flex;
    box-shadow: var(--box-shadow);
    background: white;
    margin-bottom:12px;
    border: 1px solid var(--color-gray-200);
    border-radius:4px;
    input {
      width: 100%;
      border: transparent;
      background: transparent;
      outline: transparent;
    }

    button {
      background: transparent;
      border: transparent;
      outline: none;
      cursor: pointer;
      padding:4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius:4px;

      :hover {
        background: var(--color-gray-200);
      }
    }
  }
`;

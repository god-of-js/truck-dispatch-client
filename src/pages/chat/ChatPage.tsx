import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from 'modules/index';

import {
  selectChatByChatId,
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
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const chatBottomRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.account.user);
  const chatLog = useSelector(selectChatLog(chatId!));
  const chats = useSelector(selectChatByChatId(chatId!));

  const defaultFormData = {
    message: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [currentLengthOfChats, setCurrentLengthOfChats] = useState(0);

  const alternateUser = useMemo(() => {
    if (!chatLog || !user) return {} as User;
    if (chatLog?.clientId === user?._id) {
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
      chatId: chatId!,
      message: formData.message,
      senderId: user?._id!,
      receiverId: alternateUser?._id!,
      createdAt: Date.now()
    };

    setFormData(defaultFormData);
    dispatch(toAnyAction(createChat(data)));
  }

  function initReadChat() {
    const lastSentChat = chats[chats.length - 1];
    if (
      lastSentChat &&
      lastSentChat.senderId !== user?._id &&
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
            <ChatBubble isMine={chat.senderId === user?._id} key={index}>
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
                    <UiIcon icon="PaperPlaneTilt" />
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
`;

const Header = styled.header`
  padding: ${pxToRem(12)};
  border-bottom: 1px solid var(--color-gray-200);
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .user-details {
    display: flex;
    align-items: center;
    gap: ${pxToRem(12)};
  }
`;

const ChatContainer = styled.div`
  padding: ${pxToRem(80)} ${pxToRem(32)} ${pxToRem(80)} ${pxToRem(32)};
  background: var(--color-gray-100);
  height: 80%;
  overflow: scroll;
`;

const ChatBubble = styled.div`
  display: flex;
  justify-content: ${({ isMine }: { isMine: boolean }) =>
    isMine ? 'flex-end' : ''};
  .chat-bubble-inner {
    padding: ${pxToRem(8)};
    margin: ${pxToRem(2)} 0;
    border-radius: ${pxToRem(4)};
    background: ${({ isMine }: { isMine: boolean }) =>
      isMine ? 'var(--color-primary)' : 'var(--color-gray-500)'};
    width: fit-content;
    color: white;
    max-width: 70%;
  }
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding-bottom: ${pxToRem(16)};
  .input-group {
    width: 90%;
    margin: auto;
  }
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
    padding: ${pxToRem(12)};
    display: flex;
    box-shadow: var(--box-shadow);
    background: white;
    margin-bottom: ${pxToRem(12)};
    border: 1px solid var(--color-gray-200);
    border-radius: ${pxToRem(4)};
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
      padding: ${pxToRem(4)};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${pxToRem(4)};

      :hover {
        background: var(--color-gray-200);
      }
    }
  }
`;

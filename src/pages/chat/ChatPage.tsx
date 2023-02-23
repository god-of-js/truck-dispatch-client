import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from 'modules/index';
import { selectDashboardUser } from 'modules/Account';
import { getChats, selectChatByChatId, sendChat } from 'modules/Chat';

import { toAnyAction } from 'utils/helpers';
import uuidv4 from 'utils/uuid';

import Chat from 'types/Chat';

import UiAvatar from 'ui/UiAvatar';
import UiIcon from 'ui/UiIcon';
import UiForm from 'ui/UiForm';

export default function ChatPage() {
  const { agentId, transporterId } = useParams();
  const dispatch = useDispatch();
  const chatWindowRef = useRef(null);
  const user = useSelector(selectDashboardUser);
  const chats = useSelector(selectChatByChatId(`${agentId}-${transporterId}`));
  const users = useSelector((state: RootState) => state.account.users);
  const alternateUsersId = user?.id === transporterId ? agentId : transporterId;
  const alternateUser = users.find(({ id }) => id === alternateUsersId);

  const defaultFormData = {
    message: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  function updateMessage(e: { target: { value: string } }) {
    setFormData({ message: e.target.value });
  }

  function sendMessage() {
    const data: Chat = {
      id: uuidv4(),
      chatId: `${agentId}-${transporterId}`,
      message: formData.message,
      createdAt: Date.now(),
      senderId: user?.id || '',
      agentId: agentId!,
      transporterId: transporterId!,
    };
    setFormData(defaultFormData);
    dispatch(toAnyAction(sendChat(data)));
  }

  useEffect(() => {
    const element = chatWindowRef.current;
    if (element) {
      // 👇 Will scroll smoothly to the bottom of the chat window
      // @ts-ignore
      element.scrollTo(0, element.scrollHeight);
    }
  }, [chats]);

  return (
    <ChatPageStyling>
      <Header>
        <div className="user-details">
          <UiAvatar />
          <div>{alternateUser?.firstName + ' ' + alternateUser?.lastName}</div>
        </div>
      </Header>

      <ChatContainer>
        <div id="chat-window" ref={chatWindowRef}>
          {chats.map((chat, index) => (
            <ChatBubble isMine={chat.senderId === user?.id} key={index}>
              <div className="chat-bubble-inner">{chat.message}</div>
            </ChatBubble>
          ))}
        </div>
      </ChatContainer>
      <InputContainer>
        <UiForm formData={formData} onSubmit={sendMessage}>
          {() => (
            <div className="inner">
              <input
                placeholder="Enter Message"
                value={formData.message}
                onChange={updateMessage}
              />
              <button type="submit">
                <UiIcon icon="PaperPlaneTilt" />
              </button>
            </div>
          )}
        </UiForm>
      </InputContainer>
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
  .inner {
    padding: ${pxToRem(12)};
    display: flex;
    box-shadow: var(--box-shadow);
    background: white;
    margin-bottom: ${pxToRem(12)};
    border: 1px solid var(--color-gray-200);
    border-radius: ${pxToRem(4)};
    width: 90%;
    margin: auto;
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

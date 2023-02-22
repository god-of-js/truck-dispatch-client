import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import UiAvatar from 'ui/UiAvatar';

export default function ChatLayout() {
  const chatHeads: string[] = ['', '', '', '', ''];
  return (
    <ChatLayoutDesign>
      <div className="card">
        <ul className="chat-heads">
          {chatHeads.map((val, index) => (
            <li key={index}>
              <UiAvatar />
              <div className="content-container">
                <div className="name">Eze Henry</div>
                <div className="last-text">
                  Lorem ipsum dolor, sit amet dolor kage bunshin no jutsu dolor
                  amet and what ever you say concine your papa
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </ChatLayoutDesign>
  );
}

const ChatLayoutDesign = styled.div`
  padding-top: ${pxToRem(24)};
  height: 85vh;

  .card {
    background: #ffffff;
    width: 90%;
    height: 100%;
    margin: auto;
    border: 1px solid var(--color-gray-200);
    border-radius: ${pxToRem(8)};
    color: var(--color-gray-600);
    display: flex;
    overflow: hidden;
  }

  .chat-heads {
    padding: 0;
    position: relative;
    margin: 0;
    list-style-type: none;
    width: 30%;
    border-right: 1px solid var(--color-gray-200);
    height: 100%;

    li {
      padding: ${pxToRem(12)};
      gap: ${pxToRem(12)};
      border-bottom: 1px solid var(--color-gray-200);
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
    }
  }

  .outlet-container {
    width: 70%;
  }
`;

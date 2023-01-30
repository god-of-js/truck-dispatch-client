import React from 'react';
import styled from 'styled-components';
import UiIcon from '../ui/UiIcon';

export default function DashboardTopNav() {
  return (
    <TopNav>
      <span>Home</span>
      <div className="user-icon">
        <UiIcon icon="User" size="20" />
      </div>
    </TopNav>
  );
}

const TopNav = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-gray-200);
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-gray-400);
  }

  .user-icon {
    color: var(--color-gray-400);
    border: 1px solid var(--color-gray-200);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

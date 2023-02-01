import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UiIcon from '../ui/UiIcon';

export default function DashboardTopNav() {
  const location = useLocation();
  console.log(location);
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
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);
  padding: ${pxToRem(8)} ${pxToRem(20)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: ${pxToRem(16)};
    font-weight: 600;
    color: var(--color-gray-400);
  }

  .user-icon {
    color: var(--color-gray-400);
    border: ${pxToRem(1)} solid var(--color-gray-200);
    border-radius: 50%;
    width: ${pxToRem(36)};
    height: ${pxToRem(36)};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

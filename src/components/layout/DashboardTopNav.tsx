import React from 'react';
import styled from 'styled-components';
import UiAvatar from 'ui/UiAvatar';
// TODO: change Home to a dynamic text
export default function DashboardTopNav() {
  return (
    <TopNav>
      <span>Home</span>
      <UiAvatar />
    </TopNav>
  );
}

const TopNav = styled.nav`
  background-color: #ffffff;
  border-bottom: ${pxToRem(1)} solid var(--color-gray-200);
  padding: ${pxToRem(12)} ${pxToRem(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: ${pxToRem(16)};
    font-weight: 600;
    color: var(--color-gray-400);
  }
`;

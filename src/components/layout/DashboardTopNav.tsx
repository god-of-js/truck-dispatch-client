import React from 'react';
import styled from 'styled-components';

export default function DashboardTopNav() {
  return (
    <TopNav>
      <span>Home</span>
    </TopNav>
  );
}

const TopNav = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-gray-200);
  position: relative;
  padding: 5px;
  width: 100%;
`;

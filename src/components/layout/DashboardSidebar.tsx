import React, { useState } from 'react';
import styled from 'styled-components';
import UserType from '../../types/UserType';
import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import UiIcon from '../ui/UiIcon';
interface Props {
  userType?: UserType;
}
export default function DashboardSidebar({ userType }: Props) {
  return (
    <Sidebar>
      <TDLogo src={TruckDispatchLogo} alt="truck-dispatch" />

      <TabList>
        <Tab>
          <UiIcon icon="Eye" />
          <span>Home</span>
        </Tab>
      </TabList>
    </Sidebar>
  );
}

const Sidebar = styled.nav`
  padding: 0 16px;
`;

const TDLogo = styled.img`
  width: 150px;
`;

const TabList = styled.ul`
  padding: 0px;
`;

const Tab = styled.li`
  list-style-type: none;
  padding: 16px 8px;
  font-size: 14px;
  border-radius: 8px;
  color: var(--color-primary-200);

  &:hover {
    background: var(--color-primary-100);
    color: var(--color-primary-200);
  }
`;

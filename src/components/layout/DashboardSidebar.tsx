import React from 'react';
import styled from 'styled-components';
import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import UiIcon, { Icons } from '../ui/UiIcon';
import sizes from '../../sizes';

interface Route {
  iconName: Icons;
  path: string;
  name: string;
}

export default function DashboardSidebar() {
  const transporterRoutes: Route[] = [
    {
      path: '/',
      name: 'Home',
      iconName: 'House',
    },
    {
      path: '/available-jobs',
      name: 'Available Jobs',
      iconName: 'Suitcase',
    },
    {
      path: '/my-trips',
      name: 'My Trips',
      iconName: 'Truck',
    },
    {
      path: '/payments',
      name: 'Payments',
      iconName: 'Money',
    },
    {
      path: '/referrals',
      name: 'Referrals & Bonuses',
      iconName: 'UsersThree',
    },
  ];

  const agentRoutes: Route[] = [
    {
      path: '/',
      name: 'Home',
      iconName: 'House',
    },
    {
      path: '/my-trips',
      name: 'My Trips',
      iconName: 'Truck',
    },
    {
      path: '/transactions',
      name: 'Transactions',
      iconName: 'Money',
    },
    {
      path: '/referrals',
      name: 'Referrals and Bonuses',
      iconName: 'UsersThree',
    },
  ];

  const routes = transporterRoutes;

  return (
    <Sidebar>
      <LogoContainer>
        <TDLogo src={TruckDispatchLogo} alt="truck-dispatch" />
      </LogoContainer>

      <TabList>
        {routes.map((route, index) => (
          <Tab key={index}>
            <UiIcon icon={route.iconName} size="24" />
          </Tab>
        ))}
      </TabList>
    </Sidebar>
  );
}

const Sidebar = styled.nav`
  background: #ffffff;
  border-top: px(1) solid var(--color-gray-200);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 5%;
    border-top: none;
    position: static;
    border-right: px(1) solid var(--color-gray-200);
  }
`;

const LogoContainer = styled.div`
  display: none;
  justify-content: center;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: flex;
  }
`;

const TDLogo = styled.img`
  width: 100px;
  margin: auto;
  margin: 0px -12px;
`;

const TabList = styled.ul`
  padding: 0px;
  margin: 0;
  display: flex;
  justify-content: space-around;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
  }
`;

const Tab = styled.li`
  list-style-type: none;
  padding: 12px 20px;
  font-size: 14px;
  color: var(--color-gray-500);
  font-weight: 600;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid transparent;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    border-bottom: none;
    border-left: 4px solid transparent;
    margin: 8px 0;
  }
`;

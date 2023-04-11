import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sizes from 'utils/sizes';

import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';

import UiIcon, { Icons } from '../ui/UiIcon';
import { RootState } from 'modules/index';
import { removeUserSessionId } from 'utils/userSession';
import { selectUnreadChats } from 'modules/Chat';

interface Route {
  iconName: Icons;
  path: string;
  name: string;
}
export default function DashboardSidebar() {
  const user = useSelector((state: RootState) => state.account.user);
  const unreadChat = useSelector(selectUnreadChats);
  const navigate = useNavigate();
  const appLocation = useLocation();

  const logOutUser = () => {
    removeUserSessionId();
    navigate('/auth/login');
  };

  const transporterRoutes: Route[] = [
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
  ];

  const agentRoutes: Route[] = [
    {
      path: '/my-trips',
      name: 'My Trips',
      iconName: 'Truck',
    },
  ];

  const routes = useMemo(() => {
    if (!user) return [];

    return user?.userType === 'transporter' ? transporterRoutes : agentRoutes;
  }, [user]);

  function isRouteActive(route: string) {
    if (route === '/') return route === appLocation.pathname;

    return appLocation.pathname.includes(route);
  }

  return (
    <Sidebar>
      <div className="sidebar__inner">
        <Link to="/my-trips">
          <LogoContainer>
            <TDLogo src={TruckDispatchLogo} alt="truck-dispatch" />
          </LogoContainer>
        </Link>
        <TabList>
          {routes.map((route, index) => (
            <Link to={route.path} key={index}>
              <Tab isActive={isRouteActive(route.path)}>
                <UiIcon icon={route.iconName} size="24" />
              </Tab>
            </Link>
          ))}
          <Link to="/chat">
            <Tab isActive={isRouteActive('/chat')}>
              <div className="chat-icon-container">
                <UiIcon icon="Chats" size="24" />
                {unreadChat.length !== 0 && (
                  <MessageCount>{unreadChat.length}</MessageCount>
                )}
              </div>
            </Tab>
          </Link>
        </TabList>

        <BottomActions>
          <LogOutContainer onClick={() => logOutUser()}>
            <UiIcon icon="SignOut" size="24" />
          </LogOutContainer>
        </BottomActions>
      </div>
    </Sidebar>
  );
}

const Sidebar = styled.nav`
  background: #ffffff;
  border-top: 1px solid var(--color-gray-200);
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  left: 0;

  .sidebar__inner {
    position: relative;
    height: 100%;
    width: 100%;
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 7%;
    border-top: none;
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 5%;
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
  width: ${pxToRem(100)};
  margin: auto;
  margin: 0 ${pxToRem(-12)};
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

const LogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray-500);
  width: 100%;
  font-weight: 600;

  &:hover {
    color: var(--color-danger);
  }
`;

const Tab = styled.li`
  list-style-type: none;
  padding: ${pxToRem(12)} ${pxToRem(20)};
  font-size: ${pxToRem(14)};
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'var(--color-primary)' : 'var(--color-gray-500)'};
  font-weight: 600;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;

  .chat-icon-container {
    position: relative;
    width: fit-content;
  }

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    border-bottom: none;
    border-left: ${pxToRem(4)} solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'var(--color-primary)' : 'transparent'};
    margin: ${pxToRem(8)} 0;
  }
`;

const BottomActions = styled.div`
  position: relative;
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${pxToRem(48)} 0;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
  }
`;

const MessageCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background: var(--color-danger-800);
  color: white;
  font-size: ${pxToRem(12)};
  width: ${pxToRem(18)};
  height: ${pxToRem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -${pxToRem(6)};
  margin-right: -${pxToRem(6)};
  border-radius: 50%;
`;

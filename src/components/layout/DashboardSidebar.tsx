import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sizes from 'utils/sizes';

import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';

import UiIcon, { Icons } from '../ui/UiIcon';
import { RootState } from 'modules/index';
import { removeUserSessionId } from 'utils/localStorageMethods';
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
      iconName: 'Jobs',
    },
    {
      path: '/my-trips',
      name: 'My Trips',
      iconName: 'TruckTick',
    },
    {
      path: '/payments',
      name: 'Payments',
      iconName: 'Moneys',
    },
    {
      path: '/',
      name: 'Vehcles',
      iconName: 'TruckImg',
    },
    {
      path: '/',
      name: 'Analytics',
      iconName: 'ChartSquare',
    },
    {
      path: '/',
      name: 'Settings',
      iconName: 'Settings',
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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleShowNames = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Sidebar isExpanded={isExpanded}>
      <div className="sidebar__inner">
        <header>
          <Link to="/my-trips">
            <img src={TruckDispatchLogo} alt="truck-dispatch" />
          </Link>
          <button className="toggle-btn" onClick={toggleShowNames}>
            <UiIcon
              icon={isExpanded ? 'ArrowCircleLeft' : 'ArrowCircleLeft'}
              size="20"
            />
          </button>
        </header>

        <TabList>
          {routes.map((route, index) => (
            <Link to={route.path} key={index}>
              <Tab isActive={isRouteActive(route.path)} isExpanded={isExpanded}>
                <UiIcon icon={route.iconName} size="24" />
                {isExpanded && <div className="route-name">{route.name}</div>}
              </Tab>
            </Link>
          ))}
          <Link to="/chat">
            <Tab isActive={isRouteActive('/chat')} isExpanded={isExpanded}>
              <UiIcon icon="MessageChat" size="24" />
              {/* TODO: figure out how to manage message count with new design */}
              {/* {unreadChat.length !== 0 && (
                  <MessageCount>{unreadChat.length}</MessageCount>
                )} */}
              <span className="route-name">Chat</span>
            </Tab>
          </Link>
        </TabList>

        <BottomActions>
          <UserContainer onClick={() => logOutUser()}>
            <UserContainerInner>
              <UiIcon icon="User" size="20" />
            </UserContainerInner>
            <div className="user-details">
              {isExpanded && (
                <p className=" user-name">
                  Onyewuchi Emeka <br />
                  TRANSPORTER{' '}
                </p>
              )}
            </div>
          </UserContainer>
          <LogOutContainer onClick={() => logOutUser()}>
            <UiIcon icon="Logout" size="24" />
            {isExpanded && <p className="logout">Logout</p>}
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

    header {
      border-bottom: ${pxToRem(1)} solid var(--color-gray);
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: ${pxToRem(100)};
      }

      .toggle-btn {
        position: absolute;
        background-color: white;
        height: ${pxToRem(32)};
        width: ${pxToRem(32)};
        border-radius: 50%;
        outline: 0;
        border: transparent;

        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        margin-right: -${pxToRem(12)};

        @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
          display: none;
        }
      }
    }
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: ${({ isExpanded }: { isExpanded: boolean }) =>
      isExpanded ? '16%' : '7%'};
    border-top: none;
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
  }
`;

const TabList = styled.ul`
  padding: ${pxToRem(32)} ${pxToRem(24)};
  margin: 0;
  display: flex;
  justify-content: space-around;
  list-style-type: none;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
  }
`;

interface TabProps {
  isActive: boolean;
  isExpanded: boolean;
}
const Tab = styled.li`
  padding: ${pxToRem(12)};
  font-size: ${pxToRem(16)};
  color: ${({ isActive }: TabProps) =>
    isActive ? 'var(--color-primary)' : 'var(--color-primary-100)'};
  font-weight: 600;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-items: left;
  border-radius: 0 ${pxToRem(8)} ${pxToRem(8)} 0;
  gap: ${pxToRem(8)};

  svg {
    fill: var(--color-gray-80)
  }

  .route-name {
    display: ${({ isExpanded }: TabProps) => (isExpanded ? 'block' : 'none')};
  }

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background-color: var(--color-primary-10);

    svg {
      fill: var(--color-primary);
    }
  }

  @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
    /* Mobile view */
    border-bottom: none;
    padding: ${pxToRem(2)};
    border-bottom: ${pxToRem(4)} solid
      ${({ isActive }: TabProps) =>
        isActive ? 'var(--color-primary)' : 'transparent'};
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    border-bottom: none;
    border-left: ${pxToRem(4)} solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'var(--color-primary)' : 'transparent'};
    margin-bottom: ${pxToRem(12)};
  }
`;

const LogOutContainer = styled.div`
  width: 100%;
  display: flex;
  font-weight: 600;
  opacity: 0.8;
  cursor: pointer;
  color: var(--color-gray-500);
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: ${pxToRem(14)};

  align-items: center;
  justify-items: left;

  &:hover {
    color: var(--color-danger);
  }

  .logout {
    padding-left: 9.04px;
  }

  @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
    border-bottom: none;
    padding: ${pxToRem(2)} ${pxToRem(2)};

    margin: ${pxToRem(8)} 0;
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    border-bottom: none;

    margin: ${pxToRem(8)} 0;
  }
`;
const UserContainer = styled.div`
  width: 100%;
  display: flex;
  font-weight: 600;
  opacity: 0.8;
  cursor: pointer;
  color: var(--color-gray-500);
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: ${pxToRem(14)};

  align-items: center;
  justify-items: left;

  &:hover {
    color: var(--color-danger);
  }
  .user-name {
    padding-left: 9.04px;
  }

  .user-details {
    text-transform: capitalize;
    display: flex;
    padding-top: 0;
    padding-bottom: 0;
    width: 100%;
    flex-direction: column;
    padding: -10px;
  }
`;
const UserContainerInner = styled.div`
  list-style-type: none;
  height: 40px;
  width: 40px;
  background: var(--color-gray-50);
  border-radius: 50%;
  font-size: ${pxToRem(14)};
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomActions = styled.div`
  border-top: 1px solid var(--color-gray-900);
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;

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

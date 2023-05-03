import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sizes from 'utils/sizes';

import UiIcon, { Icons } from '../ui/UiIcon';
import { RootState } from 'modules/index';
import { removeUserSessionId } from 'utils/localStorageMethods';
import { selectUnreadChats } from 'modules/Chat';
import UiAvatar from 'ui/UiAvatar';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const transporterRoutes: Route[] = [
    {
      path: '/available-jobs',
      name: 'Jobs',
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
      path: '/vehicles',
      name: 'Vehicles',
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

  const userType = useMemo(() => {
    if (user?.userType === 'transporter') return 'transporter';
    if (user?.userType === 'agent') return 'agent';
    if (user?.userType === 'transportCompany') return 'Transport Company';

    return 'company';
  }, [user]);
  const routes = useMemo(() => {
    if (!user) return [];

    return user?.userType === 'transporter' ? transporterRoutes : agentRoutes;
  }, [user]);

  function isRouteActive(route: string) {
    if (route === '/') return route === appLocation.pathname;

    return appLocation.pathname.includes(route);
  }

  const logOutUser = () => {
    removeUserSessionId();
    navigate('/auth/login');
  };

  const toggleShowNames = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Sidebar isExpanded={isExpanded}>
      <div className="sidebar__inner">
        <header>
          <Link to="/my-trips">
            <div className="logo-container">
              <div className="logo-place-holder" />
              <span>Truckdispatch</span>
            </div>
          </Link>
          <button className="toggle-btn" onClick={toggleShowNames}>
            <UiIcon
              icon={isExpanded ? 'ArrowCircleLeft' : 'ArrowCircleRight'}
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
              <UiIcon icon="Chat" size="24" />
              {/* TODO: figure out how to manage message count with new design */}
              {/* {unreadChat.length !== 0 && (
                  <MessageCount>{unreadChat.length}</MessageCount>
                )} */}
              <span className="route-name">Chat</span>
            </Tab>
          </Link>
        </TabList>

        <BottomActions>
          <Link to="/profile">
            <UserContainer isExpanded={isExpanded}>
              <UiAvatar avatar={user?.avatar} />
              <div className="user-details">
                {isExpanded && (
                  <div>
                    <div className="user-name">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="user-type">{userType}</div>
                  </div>
                )}
              </div>
            </UserContainer>
          </Link>
          <LogOutContainer isExpanded={isExpanded} onClick={() => logOutUser()}>
            <div className="to-be-removed">
              <UiIcon icon="Logout" size="24" />
              {isExpanded && <p className="logout">Logout</p>}
            </div>
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
      padding: ${pxToRem(20)} 0;
      .logo-container {
        display: flex;
        align-items: center;
        gap: ${pxToRem(8)};

        .logo-place-holder {
          width: ${pxToRem(40)};
          height: ${pxToRem(40)};
          background: var(--color-primary);
          border-radius: ${pxToRem(8)};
        }
        span {
          color: var(--color-neutralBlack);
          font-size: ${pxToRem(16)};
          font-weight: 700;
          display: ${({ isExpanded }: { isExpanded: boolean }) =>
            isExpanded ? 'block' : 'none'};
        }
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
const activeTabStyle = `
border-color: var(--color-primary);
color: var(--color-primary);
background-color: var(--color-primary-10);

svg {
  fill: var(--color-primary);
}`;
const Tab = styled.li`
  padding: ${pxToRem(12)};
  font-size: ${pxToRem(16)};
  color: ${({ isActive }: TabProps) =>
    isActive ? 'var(--color-primary)' : 'var(--color-gray-80)'};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: ${({ isExpanded }: TabProps) =>
    isExpanded ? 'flex-start' : 'center'};
  border-radius: 0 ${pxToRem(8)} ${pxToRem(8)} 0;
  gap: ${pxToRem(8)};

  svg {
    fill: ${({ isActive }: TabProps) =>
      isActive ? 'var(--color-primary)' : 'var(--color-gray-80)'};
  }

  .route-name {
    display: ${({ isExpanded }: TabProps) => (isExpanded ? 'block' : 'none')};
  }
  ${({ isActive }: TabProps) => isActive && activeTabStyle}
  &:hover {
    ${activeTabStyle}
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

const BottomActions = styled.div`
  border-top: ${pxToRem(1)} solid var(--color-gray);
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  margin: 0;
  padding: ${pxToRem(20)} 0;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
  }
`;

const UserContainer = styled.div`
  display: flex;
  font-weight: 600;
  gap: ${pxToRem(8)};
  opacity: 0.8;
  cursor: pointer;
  padding: 0 ${pxToRem(24)};
  color: var(--color-gray-80);
  display: flex;
  justify-content: ${({ isExpanded }: { isExpanded: boolean }) =>
    isExpanded ? 'flex-start' : 'center'};

  .user-name {
    font-size: ${pxToRem(16)};
    font-weight: 600;
    font-family: 'thiccboi-medium';
  }
  .user-type {
    font-size: ${pxToRem(10)};
    font-weight: 400;
    margin-top: ${pxToRem(8)};
    text-transform: uppercase;
  }
`;

const LogOutContainer = styled.div`
  font-weight: 600;
  opacity: 0.8;
  cursor: pointer;
  color: var(--color-danger);
  padding: ${pxToRem(12)} ${pxToRem(24)};
  font-size: ${pxToRem(14)};

  .to-be-removed {
    width: 100%;
    display: flex;
    gap: ${pxToRem(8)};
    justify-content: ${({ isExpanded }: { isExpanded: boolean }) =>
      isExpanded ? 'flex-start' : 'center'};
    align-items: center;
  }

  &:hover {
    color: var(--color-danger);
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

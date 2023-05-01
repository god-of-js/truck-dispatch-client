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
      path: '/....',
      name: 'Vehcles',
      iconName: 'TruckImg',
    },
    {
      path: '/....',
      name: 'Analytics',
      iconName: 'ChartSquare',
    },
    {
      path: '/....',
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

  // toggle function
  const [showNames, setShowNames] = useState(false);

  const toggleShowNames = () => {
    setShowNames(!showNames);
  };

  return (
    <Sidebar className={` ${showNames ? 'width' : ''} `}>
      <div className="sidebar__inner">
        <Link to="/my-trips">
          <LogoContainer>
            <TDLogo src={TruckDispatchLogo} alt="truck-dispatch" />
          </LogoContainer>
          <ToggleContainer onClick={toggleShowNames} className="toggle-button">
            {showNames ? (
              <UiIcon icon="ArrowCircleLeft" size="20" />
            ) : (
              <UiIcon icon="ArrowCircleLeft" size="20" />
            )}
          </ToggleContainer>
        </Link>

        <TabList>
          {routes.map((route, index) => (
            <Link to={route.path} key={index}>
              <Tab
                isActive={isRouteActive(route.path)}
                className={` ${showNames ? 'show-name' : ''} `}
              >
                <UiIcon icon={route.iconName} size="24" />
                {showNames && (
                  <UiIconName className="name">{route.name}</UiIconName>
                )}
              </Tab>
            </Link>
          ))}
          <Link to="/chat">
            <Tab
              className={` ${showNames ? 'show-name' : ''} `}
              isActive={isRouteActive('/chat')}
            >
              <div className="chat-icon-container">
                <UiIcon icon="MessageChat" size="24" />
                {unreadChat.length !== 0 && (
                  <MessageCount>{unreadChat.length}</MessageCount>
                )}
                {showNames && <p className="name chat-name">Chat</p>}
              </div>
            </Tab>
          </Link>
        </TabList>

        <BottomActions>
          <UserContainer onClick={() => logOutUser()}>
            <UserContainerInner>
              <UiIcon icon="User" size="20" />
            </UserContainerInner>
            <div className="user-details">
              {showNames && <p className=" user-name">Onyewuchi Emeka <br />TRANSPORTER </p>}
            </div>
          </UserContainer>
          <LogOutContainer onClick={() => logOutUser()}>
            <UiIcon icon="Logout" size="24" />
            {showNames && <p className="logout">Logout</p>}
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
    width: 7%;
  }

  &.width {
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      width: 20%;
    }
  }
`;

const LogoContainer = styled.div`
  display: none;
  justify-content: center;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: flex;
  }
`;

const ToggleContainer = styled.div`
  position: absolute;
  background-color: white;
  height: 32px;
  width: 32px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  right: 0px;
  top: 0px;

  margin-top: ${pxToRem(20)};
  margin-right: -${pxToRem(15)};

  color: var(--color-primary-10);
  font-weight: 600;

  @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
    display: none;
  }
`;

const TDLogo = styled.img`
  width: ${pxToRem(100)};
  margin: auto;
  margin: 0 ${pxToRem(-12)};
`;

const UiIconName = styled.ul`
  padding-left: 9.04px;
`;

const TabList = styled.ul`
  padding-left: 10px;
  padding-right: 10px;
  margin: 0;
  display: flex;
  justify-content: space-around;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
  }
`;

const Tab = styled.li`
  list-style-type: none;
  padding: ${pxToRem(12)} ${pxToRem(20)};
  font-size: ${pxToRem(14)};
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'var(--color-primary)' : 'var(--color-primary-100)'};
  font-weight: 600;
  opacity: 0.8;
  display: flex;

  align-items: center;
  justify-items: left;

  .chat-icon-container {
    position: fixed;
    width: fit-content;
    justify-content: center;
    align-items: center;
    display: flex;

    .chat-name {
      padding-left: 9.04px;
    }
  }

  .show-name .name {
    display: none;
  }

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background-color: var(--color-primary-10);
  }

  @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
    border-bottom: none;
    padding: ${pxToRem(2)} ${pxToRem(2)};
    border-bottom: ${pxToRem(4)} solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'var(--color-primary)' : 'transparent'};
    margin: ${pxToRem(8)} 0;
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    border-bottom: none;
    border-left: ${pxToRem(4)} solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'var(--color-primary)' : 'transparent'};
    margin: ${pxToRem(8)} 0;
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

  .user-details{
    text-transform: capitalize;
    display: flex;
    padding-top: 0;
    padding-bottom: 0;
    width: 100%;
    flex-direction: column;
    padding; -10px;

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

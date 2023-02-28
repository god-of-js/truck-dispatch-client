import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sizes from 'utils/sizes';
import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import UiIcon, { Icons } from '../ui/UiIcon';
import { selectDashboardUser } from 'modules/Account';

interface Route {
  iconName: Icons;
  path: string;
  name: string;
}

export default function DashboardSidebar() {
  const user = useSelector(selectDashboardUser);
  const navigate = useNavigate();
  const appLocation = useLocation();
  const logOutUser = () => {
    localStorage.removeItem('uid');
    navigate('auth/login');
    location.reload();
  };

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
      path: '/chat',
      name: 'Chat',
      iconName: 'Chats',
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
      path: '/chat',
      name: 'Chat',
      iconName: 'Chats',
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
      <LogoContainer>
        <TDLogo src={TruckDispatchLogo} alt="truck-dispatch" />
      </LogoContainer>
      <TabList>
        {routes.map((route, index) => (
          <Link to={route.path} key={index}>
            <Tab isActive={isRouteActive(route.path)}>
              <UiIcon icon={route.iconName} size="24" />
            </Tab>
          </Link>
        ))}
      </TabList>

      <BottomActions>
        <div className="bottom-actions-inner">
          <LogOutContainer onClick={() => logOutUser()}>
            <UiIcon icon="SignOut" size="24" />
          </LogOutContainer>
        </div>
      </BottomActions>
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
  height: calc(100% - ${pxToRem(460)});
  display: none;

  .bottom-actions-inner {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
  }
`;

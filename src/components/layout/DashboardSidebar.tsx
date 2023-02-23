import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Link, useNavigate } from 'react-router-dom';
import sizes from 'utils/sizes';
import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import UiIcon, { Icons } from '../ui/UiIcon';
import { selectDashboardUser, selectUser } from 'modules/Account';

interface Route {
  iconName: Icons;
  path: string;
  name: string;
}

export default function DashboardSidebar() {
  const user = useSelector(selectDashboardUser);
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem('uid');
    navigate('auth/login');
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

  const routes =
    user?.userType === 'transporter' ? transporterRoutes : agentRoutes;

  return (
    <Sidebar>
      <LogoContainer>
        <TDLogo src={TruckDispatchLogo} alt="truck-dispatch" />
      </LogoContainer>
      <TabList>
        {routes.map((route, index) => (
          <Link to={route.path} key={index}>
            <Tab>
              <UiIcon icon={route.iconName} size="24" />
            </Tab>
          </Link>
        ))}
      </TabList>
      <LogOutContainer onClick={() => logOutUser()}>
        <UiIcon icon="SignOut" />
      </LogOutContainer>
    </Sidebar>
  );
}

const Sidebar = styled.nav`
  background: #ffffff;
  border-top: 1px solid var(--color-gray-200);
  position: fixed;
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
  font-size: ${pxToRem(25)};
  opacity: 0.6;
  font-weight: 600;
  border-left: ${pxToRem(4)} solid transparent;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const Tab = styled.li`
  list-style-type: none;
  padding: ${pxToRem(12)} ${pxToRem(20)};
  font-size: ${pxToRem(14)};
  color: var(--color-gray-500);
  font-weight: 600;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${pxToRem(4)} solid transparent;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    border-bottom: none;
    border-left: ${pxToRem(4)} solid transparent;
    margin: ${pxToRem(8)} 0;
  }
`;

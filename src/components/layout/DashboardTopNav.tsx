import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { pathToRegexp, Key } from 'path-to-regexp';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiAvatar from 'ui/UiAvatar';
import UiDropDownMenu, { DropDownData } from 'ui/UiDropdownMenu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { removeUserSessionId } from 'utils/userSession';

interface Params {
  [key: string]: string;
}
export default function DashboardTopNav() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  function logOutUser() {
    removeUserSessionId();
    navigate('/auth/login');
  }

  const dropDownData: DropDownData[] = [
    {
      label: 'View Profile',
      path: '/profile',
      icon: <UiIcon icon="User" />,
    },
    {
      label: 'Bank Accounts',
      path: '/profile/accounts',
      icon: <UiIcon icon="CreditCard" />,
    },
    {
      label: 'Log out',
      isDanger: true,
      hasDivider: true,
      func: logOutUser,
      icon: <UiIcon icon="SignOut" />,
    },
  ].filter(({ path }) => {
    if (path === '/profile/accounts' && user?.userType === 'agent')
      return false;

    return true;
  });

  const location = useLocation();

  const routeNames = {
    '/available-jobs': 'Available Jobs',
    '/available-jobs/:id': 'View Job Details',
    '/available-jobs/:id/Bid': 'Bid On Job',
    '/my-trips': 'My Trips',
    '/my-trips/new': 'Create New Trip',
    '/my-trips/:id': 'My Trip',
    '/my-trips/:id/status': 'My Trip Status',
    '/my-trips/:id/terminal-delivery-order': 'Manage Trip TDO',
    '/my-trips/:id/request-payment-for-trip': 'Request Trip  Payment',
    '/my-trips/:id/bids': 'Trip Bids',
    '/my-trips/:id/bids/:id': 'Trip Bid',
    '/my-trips/:id/bids/:id/checkout': 'Pay for Trip',
    '/chat': 'Chat',
    '/payments': 'Payments',
    '/chat/:id/:id': 'Chat',
    '/profile': 'Profile',
    '/profile/accounts': 'Account',
    '/profile/verification': 'Verification',
    '/my-trips/:id/view-payment-request': 'View Payment Request',
  };

  type RouteNames = keyof typeof routeNames;

  const routeName = useMemo(() => {
    const pathname = location.pathname;
    const keys: Key[] = [];
    const patterns = Object.keys(routeNames)
      .map((path) => {
        const pattern = pathToRegexp(path, keys);
        const match = pattern.exec(pathname);
        if (match) {
          const params = match
            .slice(1)
            .reduce((params: Params, value: string, i: number) => {
              params[keys[i].name!] = value;
              return params;
            }, {});
          return [routeNames[path as RouteNames], params];
        }
        return null;
      })
      .filter((x) => x);

    if (patterns.length) {
      // @ts-ignore
      const [name, params] = patterns[0];
      if (Object.keys(params).length) {
        return name.replace(/:(\w+)/g, (_: string, key: string) => {
          return params[key];
        });
      }
      return name;
    }
    return '';
  }, [location.pathname]);

  return (
    <TopNav>
      <span>{routeName}</span>
      <UiDropDownMenu
        key={`${user?.avatar}`}
        options={dropDownData}
        trigger={
          <div className="avatar-caret-flex">
            <UiAvatar avatar={user?.avatar} />
            <UiIcon icon="CaretDown" />
          </div>
        }
      />
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

  .avatar-caret-flex {
    display: flex;
    align-items: center;
    gap: ${pxToRem(5)};

    span {
      font-size: ${pxToRem(16)};
      font-weight: 600;
      color: var(--color-gray-400);
    }
  }
  .avatar-caret-flex:hover {
    span {
      color: var(--color-gray-600);
    }
  }
`;

import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { pathToRegexp, Key } from 'path-to-regexp';
import styled from 'styled-components';
import UiAvatar from 'ui/UiAvatar';

interface Params {
  [key: string]: string;
}
export default function DashboardTopNav() {
  const location = useLocation();
  const routeNames = {
    '/': 'Dashboard',
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
    '/chat/:id/:id': 'Chat',
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
      }).filter(x => x)

    if (patterns.length) {
      // @ts-ignore
      const [name, params] = patterns[0];
      if (Object.keys(params).length) {
        return name.replace(/:(\w+)/g, (_: string, key: string) => {
          console.log(params[key]);
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
      <UiAvatar />
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

  span {
    font-size: ${pxToRem(16)};
    font-weight: 600;
    color: var(--color-gray-400);
  }
`;

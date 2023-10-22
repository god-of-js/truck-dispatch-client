import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import sizes from '../utils/sizes';
import { RootState } from 'modules/index';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { clientBasedUserTypes } from 'utils/constants';
import DashboardTopNav from 'components/layout/DashboardTopNav';

import UiCard from 'ui/UiCard';
import { Icons } from 'ui/UiIcon';

const UiIcon = lazy(() => import('ui/UiIcon'));
const Loader = lazy(() => import('components/layout/Loader'));

interface SettingsOptions {
  label: string;
  path: string;
  iconName: Icons;
}

export default function ProfileLayout() {
  const appLocation = useLocation();
  const user = useSelector((state: RootState) => state.account.user);

  const settingsRoutes = (
    [
      {
        label: 'Profile',
        path: '/profile',
        iconName: 'Notification',
      },
      {
        label: 'Accounts',
        path: '/profile/accounts',
        iconName: 'UserSquare',
      },
      {
        label: 'Verification',
        path: '/profile/verification',
        iconName: 'ReceiptEdit',
      },
      {
        label: 'Manage Password',
        path: '/profile/manage-password',
        iconName: 'Security',
      },
    ] as SettingsOptions[]
  ).filter((route) => {
    if (clientBasedUserTypes.includes(user?.userType!))
      return (
        route.path === '/profile' ||
        route.path === '/profile/manage-password' ||
        route.path === '/profile/accounts' ||
        route.path === '/profile/verification'
      );

    if (user?.status === 'verified')
      return route.path !== '/profile/verification';

    return true;
  });

  function isRouteActive(route: string) {
    if (
      appLocation.pathname.startsWith(route) &&
      appLocation.pathname === route
    ) {
      return true;
    }

    return false;
  }

  return (
    <>
      <DashboardTopNav routeName="Settings" />
      <ProfileLayoutStyling>
        <div className="profile-layout__inner">
          <div>
            <ul>
              {settingsRoutes.map((route, index) => (
                <li
                  key={index}
                  className={isRouteActive(route.path) ? 'active' : ''}
                >
                  <Link to={route.path}>
                    <UiIcon size="24px" icon={route.iconName} />
                    <span className="hide-in-unexpanded-large-screen">
                      {route.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="outlet_container">
            <Outlet />
          </div>
        </div>
      </ProfileLayoutStyling>
    </>
  );
}

const ProfileLayoutStyling = styled.div`
  padding: ${pxToRem(12)} ${pxToRem(24)};

  .profile-layout__inner {
    background: white;
    padding: ${pxToRem(32)} ${pxToRem(48)};
    border-radius: ${pxToRem(16)};
    min-height: 70vh;
    max-width: ${pxToRem(900)};
    display: grid;
    gap: ${pxToRem(48)};
    overflow: hidden;

    ul {
      display: flex;
      align-items: center;
      gap: ${pxToRem(16)};
      overflow-x: auto;
      white-space: nowrap;
      min-width: 100%;

      li {
        &:hover,
        &.active {
          a {
            background: var(--color-primary-10);
            color: var(--color-primary);

            svg {
              fill: var(--color-primary);
            }
          }
        }
      }
      a {
        display: flex;
        padding: ${pxToRem(16)} ${pxToRem(24)};
        align-items: center;
        gap: ${pxToRem(8)};
        border-radius: ${pxToRem(8)};
        font-size: ${pxToRem(14)};
        font-style: normal;
        font-weight: 600;
        line-height: 140%;
        letter-spacing: ${pxToRem(-0.28)};
        color: var(--color-gray-70);
      }
    }

    .outlet_container {
      width: 100%;
      margin: 0 auto;
      max-width: ${pxToRem(500)};
    }
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    .profile-layout__inner {
      display: flex;

      ul {
        flex-direction: column;
        align-items: flex-start;
        padding-right: ${pxToRem(24)};
        gap: ${pxToRem(32)};
        height: 100%;
        border-right: ${pxToRem(1)} solid var(--color-gray-50);
      }
    }
  }
`;

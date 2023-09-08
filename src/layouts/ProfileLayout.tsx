import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import sizes from '../utils/sizes';
import { RootState } from 'modules/index';

import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { clientBasedUserTypes } from 'utils/constants';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import { Icons } from 'ui/UiIcon';

import UiCard from 'ui/UiCard';

const UiIcon = lazy(() => import('ui/UiIcon'));
const Loader = lazy(() => import('components/layout/Loader'));
const UiTabs = lazy(() => import('ui/UiTabs'));

interface SettingsOptions<T> {
  label: string;
  path: string;
  iconName: T;
}

export default function ProfileLayout() {
  const appLocation = useLocation();
  const user = useSelector((state: RootState) => state.account.user);

  const settingsRoutes: SettingsOptions<Icons>[] = [
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
  ].filter((route) => {
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

  const edgeNode = (
    <GappedContainerWith12PX>
      <UiIcon size="24px" icon="Notification" />
    </GappedContainerWith12PX>
  );

  return (
    <>
      <DashboardTopNav routeName="Settings" edgeNode={edgeNode} />

      <OutletContainer>
        {/* --- this is my implementation --- */}
        <Suspense fallback={<Loader />}>
          <SettingsTab>
            <UiCard>
              <div className="settings-elements">
                <ul>
                  {settingsRoutes.map((route, index) => (
                    <Link to={route.path} key={index}>
                      <li className={isRouteActive(route.path) ? 'active' : ''}>
                        <div className="settings-option">
                          <UiIcon size="24px" icon={route.iconName} />
                          <span className="hide-in-unexpanded-large-screen">
                            {route.label}
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </UiCard>
          </SettingsTab>
          {/* --- this is my implementation --- */}
          <Outlet />
        </Suspense>
      </OutletContainer>
    </>
  );
}

const GappedContainerWith12PX = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(12)};
`;

const SettingsTab = styled.div`
  padding-left: ${pxToRem(24)};
  width: 20%;
  border-right: ${pxToRem(1)} solid var(--color-gray-30);

  .ui-card {
    padding: 0 ${pxToRem(24)};
    height: 100%;
    justify-content: center;
    align-items: center;

    .settings-elements {
      padding: ${pxToRem(32)} ${pxToRem(0)};
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: left;
      align-items: flex-start;
      gap: ${pxToRem(32)};

      ul {
        margin: 0 ${pxToRem(16)};
        display: grid;
        gap: ${pxToRem(16)};

        li {
          border-radius: ${pxToRem(8)};
          padding: ${pxToRem(8)};
          height: ${pxToRem(36)};
          width: 100%;
          display: flex;
          color: var(--color-gray-80);
          align-items: center;
          justify-content: space-between;
          font-size: ${pxToRem(16)};
          font-style: normal;
          font-weight: 600;
          cursor: pointer;
          &.active,
          &:hover,
          &:focus {
            background: var(--color-primary-10);
            color: var(--color-primary);
            svg {
              fill: var(--color-primary);
            }
          }

          .settings-option {
            display: flex;
            justify-content: center;
            gap: ${pxToRem(16)};
            align-items: center;
            padding: ${pxToRem(16)} ${pxToRem(24)};
          }
        }
      }
    }

    @media only screen and (max-width: ${sizes.tabletSmallWidth}) {
      display: none;
    }
    }
  }
`;

const OutletContainer = styled.div`
  padding: ${pxToRem(24)} 0;
  min-height: 70%;
  display: flex;

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding: ${pxToRem(48)} 0;
  }
`;

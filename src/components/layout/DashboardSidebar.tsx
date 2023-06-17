import React, { lazy, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sizes from 'utils/sizes';
import { ReactComponent as AppLogo } from '../../assets/logo.svg';

import { RootState } from 'modules/index';
import { removeUserSessionId } from 'utils/localStorageMethods';
import { selectUnreadChats } from 'modules/Chat';
import { shipperRoutes, transporterRoutes } from './routes';
import { setUser } from 'modules/Account';

const UiButton = lazy(() => import('ui/UiButton'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));
const UiIcon = lazy(() => import('ui/UiIcon'));

export default function DashboardSidebar() {
  const user = useSelector((state: RootState) => state.account.user);
  const unreadChat = useSelector(selectUnreadChats);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appLocation = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const userType = useMemo(() => {
    if (user?.userType === 'transporter') return 'transporter';
    if (user?.userType === 'shipper') return 'shipper';
    if (user?.userType === 'transportCompany') return 'Transport Company';

    return 'company';
  }, [user]);

  const routes = useMemo(() => {
    if (!user) return [];

    return user?.userType === 'transporter' ? transporterRoutes : shipperRoutes;
  }, [user]);

  function isRouteActive(route: string) {
    if (route === '/') return route === appLocation.pathname;

    return appLocation.pathname.includes(route);
  }

  function logOutUser() {
    removeUserSessionId();
    dispatch(setUser(null));
    window.location.reload();
  }

  function toggleShowNames() {
    setIsExpanded(!isExpanded);
  }

  function closeIsMobileExpandedIfOpen() {
    if (isMobileExpanded) setIsMobileExpanded(false);
  }

  return (
    <>
      <Sidebar isExpanded={isExpanded} isMobileExpanded={isMobileExpanded}>
        <div className="sidebar__inner">
          <header className="hide-in-small-screen">
            <Link to="/my-trips" onClick={closeIsMobileExpandedIfOpen}>
              <AppLogo />
              <span className="app-name hide-in-unexpanded-large-screen">
                TruckDispatch
              </span>
            </Link>
            <button className="toggle-btn" onClick={toggleShowNames}>
              <UiIcon
                icon={isExpanded ? 'ArrowCircleLeft' : 'ArrowCircleRight'}
                size="20"
              />
            </button>
          </header>
          <div className="side-menu-text hide-in-large-screen">SIDE MENU</div>

          <ul>
            {routes.map((route, index) => (
              <Link
                to={route.path}
                key={index}
                onClick={closeIsMobileExpandedIfOpen}
              >
                <li className={isRouteActive(route.path) ? 'active' : ''}>
                  <div className="list-item-content">
                    <UiIcon icon={route.iconName} size="24" />{' '}
                    <span className="hide-in-unexpanded-large-screen">
                      {route.name}
                    </span>
                  </div>
                  <div className="hide-in-large-screen">
                    {isRouteActive(route.path) && <UiIcon icon="Tick" />}
                  </div>
                </li>
              </Link>
            ))}
            <Link to="/chat" onClick={closeIsMobileExpandedIfOpen}>
              <li className={isRouteActive('/chat') ? 'active' : ''}>
                <div className="list-item-content">
                  <UiIcon icon="Chat" size="24" />{' '}
                  <span className="hide-in-unexpanded-large-screen">Chat</span>
                </div>
                {isRouteActive('/chat') && (
                  <div className="hide-in-large-screen">
                    <UiIcon icon="Tick" />
                  </div>
                )}
              </li>
            </Link>
          </ul>

          <div className="bottom-actions">
            <Link to="/profile" onClick={closeIsMobileExpandedIfOpen}>
              <div className="profile">
                <div className="user-details">
                  <UiAvatar avatar={user?.avatar} />
                  <div className="hide-in-unexpanded-large-screen">
                    <div className="user-name">{`${user?.firstName} ${user?.lastName}`}</div>
                    <div className="user-type">{userType}</div>
                  </div>
                </div>
                <div className="hide-in-large-screen">
                  <UiButton variant="secondary">View profile</UiButton>
                </div>
              </div>
            </Link>
            <div className="logout-container">
              <div className="logout-content" onClick={logOutUser}>
                <span className="hide-in-small-screen">
                  <UiIcon icon="Logout" size="24" />
                </span>
                <span className="logout-text hide-in-unexpanded-large-screen">
                  Logout
                </span>
              </div>
              <Button
                className="hide-in-large-screen"
                onClick={closeIsMobileExpandedIfOpen}
              >
                <span>Close</span> <UiIcon icon="CloseThick" size="15" />
              </Button>
            </div>
          </div>
        </div>
      </Sidebar>
      <BottomNav>
        {routes.slice(0, 3).map((route) => (
          <Link to={route.path} key={route.path}>
            <Button className={isRouteActive(route.path) ? 'active' : ''}>
              {route.name}
            </Button>
          </Link>
        ))}
        <Button onClick={() => setIsMobileExpanded(true)}>
          <UiIcon icon="Menu" size="24" />
        </Button>
      </BottomNav>
    </>
  );
}

const Sidebar = styled.nav<{ isExpanded: boolean; isMobileExpanded: boolean }>`
  display: ${({ isMobileExpanded }) => (isMobileExpanded ? 'block' : 'none')};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 2;
  /* TODO: calc the height of 100% - nav bar height */
  height: ${({ isMobileExpanded }) =>
    isMobileExpanded ? 'calc(100% - 72px)' : 'none'};

  .hide-in-small-screen {
    display: none;
  }

  .side-menu-text {
    margin: 24px 16px;
    font-family: 'thiccboi-extrabold';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.05em;
    color: var(--color-gray-70);
  }

  ul {
    margin: 0 16px;
    display: grid;
    gap: 12px;

    a {
      text-decoration: none;
    }

    li {
      border-radius: 8px;
      padding: 8px;
      height: 36px;
      color: var(--color-gray-70);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .list-item-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      &.active {
        background: var(--color-primary-10);
        color: var(--color-primary);

        svg {
          fill: var(--color-primary);
        }
      }
    }
  }

  .bottom-actions {
    position: absolute;
    bottom: 0;
    width: 100%;

    .profile {
      border-bottom: 1px solid var(--color-gray-30);
      border-top: 1px solid var(--color-gray-30);
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .user-details {
        display: flex;
        align-items: center;
        gap: 8px;

        .user-name {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          letter-spacing: -0.02em;
          color: var(--color-gray-80);
        }
        .user-type {
          font-style: normal;
          font-weight: 400;
          font-size: 10px;
          line-height: 140%;
          letter-spacing: 0.05em;
          color: var(--color-gray-80);
          text-transform: uppercase;
        }
      }
    }
    .logout-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      .logout-content {
        flex-grow: 1;
        cursor: pointer;
      }

      .logout-text {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-danger);
      }
    }
  }

  @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
    display: block;
    width: ${({ isExpanded }) => (isExpanded ? '16%' : '7%')};
    min-width: ${({ isExpanded }) => (isExpanded ? '260px' : '124px')};
    border-top: none;
    position: static;
    border-right: 1px solid var(--color-gray-200);

    .sidebar__inner {
      height: 100%;
      width: 100%;
      position: relative;
    }

    header {
      border-bottom: 1px solid var(--color-gray);
      margin-bottom: 32px;
      padding: 28px 24px;
      display: flex !important;
      align-items: center;

      a {
        width: 100%;
        height: 100%;
        text-decoration: none;
        font-style: normal;
        font-family: 'thiccboi-extrabold';
        font-weight: 700;
        font-size: 18px;
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: ${({ isExpanded }) => (isExpanded ? '' : 'center')};
      }

      .toggle-btn {
        position: absolute;
        background-color: white;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        outline: 0;
        border: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        margin-right: -12px;
      }
    }

    .hide-in-unexpanded-large-screen {
      display: ${({ isExpanded }) => (isExpanded ? '' : 'none')};
    }

    .side-menu-text {
      display: none;
    }
    .hide-in-large-screen {
      display: none;
    }
    .hide-in-small-screen {
      display: block;
    }

    ul {
      gap: 20px;
      margin: 0 24px;
      li {
        border-left: 4px solid transparent;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;

        .list-item-content {
          justify-content: ${({ isExpanded }) =>
            isExpanded ? 'flex-start' : 'center'};
          flex-grow: 1;
        }
        &.active,
        &:hover,
        &:focus {
          border-left: 4px solid var(--color-primary);
          background: var(--color-primary-10);
          color: var(--color-primary);
          svg {
            fill: var(--color-primary);
          }
        }
      }
    }
    .bottom-actions {
      .profile {
        border-bottom: transparent;
        padding: 20px 24px 8px 24px;

        .user-details {
          flex-grow: 1;
          justify-content: ${({ isExpanded }) => (isExpanded ? '' : 'center')};
        }
      }

      .logout-container {
        padding: 8px 24px;
        margin: 16px 0;

        .logout-content {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          justify-content: ${({ isExpanded }) => (isExpanded ? '' : 'center')};
        }
      }
    }
  }
`;

const BottomNav = styled.footer`
  background: white;
  border-radius: 16px 16px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  z-index: 1;

  @media screen and (min-width: ${sizes.mobileLargeWidth}) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  gap: 33px;
  height: 44px;
  background: var(--color-gray-20);
  border-radius: 8px;
  outline: none;
  border: transparent;
  font-family: 'thiccboi-bold';
  letter-spacing: -0.02em;
  color: var(--color-gray-70);
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 12px;

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-10);
    color: var(--color-primary);
    svg {
    }
  }
`;

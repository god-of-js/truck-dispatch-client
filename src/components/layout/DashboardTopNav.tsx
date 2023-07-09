import React, { lazy, useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import sizes from 'utils/sizes';

import routes from './routes';

import { OnChangeParams } from 'ui/UiInput';

const AppLogo = lazy(() => import('ui/AppLogo'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiFilterTag = lazy(() => import('ui/UiFilterTag'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiInput = lazy(() => import('ui/UiInput'));

interface Filter {
  title: string;
  route: string;
  value?: string | number;
  customWidth?: number;
}
interface Props {
  routeName: string;
  edgeNode?: React.ReactNode;
  startNode?: React.ReactNode;
  pageFilters?: Filter[];
  searchQuery?: string;
  handleQueryChange?: (params: OnChangeParams) => void;
}
export default function DashboardTopNav({
  routeName,
  startNode,
  pageFilters,
  edgeNode,
  searchQuery,
  handleQueryChange,
}: Props) {
  const location = useLocation();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const presentRoute = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  const routeIconName = useMemo(() => {
    const activeRoute = routes.find(({ path }) =>
      location.pathname.includes(path),
    );

    return activeRoute?.iconName;
  }, [location]);

  return (
    <TopNavContainer>
      <TopNav>
        <div className="start-container">
          {startNode}
          <span className="route-name">{routeName}</span>
          <span className="logo">
            <AppLogo />
          </span>
          <div className="filters">
            {pageFilters?.map((filter) => (
              <Link to={filter.route} key={filter.title}>
                <UiFilterTag
                  title={filter.title}
                  isActive={filter.route === presentRoute}
                  value={filter.value}
                  customWidth={filter.customWidth}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="edge-container">
          {handleQueryChange && (
            <>
              <span className={!isInputVisible ? 'search-input' : ''}>
                <OutsideClickHandler
                  onOutsideClick={() => setIsInputVisible(false)}
                >
                  <UiInput
                    onChange={handleQueryChange}
                    value={searchQuery || null}
                    name="searchQuery"
                    placeholder="Search..."
                    icon="Search"
                    size="md"
                  />
                </OutsideClickHandler>
              </span>
              {!isInputVisible && (
                <span className="search-btn">
                  <UiButton
                    variant="icon-neutral"
                    size="large"
                    onClick={() => setIsInputVisible(true)}
                  >
                    <UiIcon icon="Search" size="24" />
                  </UiButton>
                </span>
              )}
            </>
          )}
          <div className="edge-node">{edgeNode}</div>
          {false && (
            <UiButton variant="icon-neutral" size="large">
              <UiIcon icon="Notification" size="24" />
            </UiButton>
          )}
        </div>
      </TopNav>
      <BottomTopNav>
        <div className="route-name-container">
          <span className="route-icon">
            {routeIconName && <UiIcon icon={routeIconName} size="28" />}
          </span>
          <span className="route-name">{routeName}</span>
        </div>
        <div className="filters">
          {pageFilters?.map((filter) => (
            <Link to={filter.route} key={filter.title}>
              <UiFilterTag
                title={filter.title}
                customWidth={filter.customWidth}
                isActive={filter.route === presentRoute}
                value={filter.value}
              />
            </Link>
          ))}
        </div>
      </BottomTopNav>
    </TopNavContainer>
  );
}

const TopNavContainer = styled.div`
  @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
    background: #fff;
  }
`;

const TopNav = styled.nav`
  padding: ${pxToRem(12)} ${pxToRem(24)};
  height: ${pxToRem(72)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .start-container {
    display: flex;
    align-items: center;
    gap: ${pxToRem(24)};

    .filters {
      display: none;
      align-items: center;
      gap: ${pxToRem(12)};
    }
  }

  .route-name {
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(20)};
    font-weight: 700;
    font-family: 'thiccboi-extrabold';
    display: none;
  }

  .edge-container {
    display: flex;
    align-items: center;
    gap: ${pxToRem(12)};
    .notification-icon {
      width: 44px;
      height: 44px;
      background: white;
      border-radius: ${pxToRem(8)};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        width: ${pxToRem(24)};
        height: ${pxToRem(24)};
        fill: var(--color-gray-80);
      }
    }

    .search-input {
      display: none;
    }
    /* TODO: remove when mobile input has been properly thought out. */
    .search-btn {
      display: none !important;
    }

    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      .search-input {
        display: block;
      }

      /* .search-btn {
        display: none !important;
      } */
    }
  }

  @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
    .start-container {
      display: flex;
      gap: ${pxToRem(8)};
      .logo {
        display: none;
      }
    }
    .route-name {
      display: block;
    }

    button {
      &.icon-neutral {
        background: white;
      }
    }
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    .edge-container {
      .edge-node {
        display: block;
      }
    }
  }

  @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
    .start-container {
      .filters {
        display: flex;
      }
    }
  }
`;

const BottomTopNav = styled.div`
  display: block;
  padding: ${pxToRem(12)} ${pxToRem(24)};
  border-bottom: ${pxToRem(1)} solid var(--color-gray-30);
  border-top: ${pxToRem(1)} solid var(--color-gray-30);

  .route-name-container {
    margin-bottom: ${pxToRem(4)};
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};

    svg {
      fill: var(--color-neutralBlack);
    }
    .route-name {
      font-style: normal;
      font-weight: 700;
      font-size: ${pxToRem(24)};
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
    }
  }

  .filters {
    display: flex;
    align-items: center;
    gap: ${pxToRem(12)};
    overflow-x: auto;
  }

  @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
    border-bottom: transparent;
    border-top: transparent;
    .route-name,
    .route-icon {
      display: none;
    }
  }
  @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
    display: none;
  }
`;

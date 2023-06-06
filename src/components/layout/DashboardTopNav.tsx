import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UiFilterTag from 'ui/UiFilterTag';
import UiIcon from 'ui/UiIcon';

interface Filter {
  title: string;
  route: string;
  value?: string | number;
}
interface Props {
  routeName: string;
  startChild?: React.ReactNode;
  edgeChild?: React.ReactNode;
  pageFilters?: Filter[];
}
export default function DashboardTopNav({
  routeName,
  startChild,
  pageFilters,
  edgeChild,
}: Props) {
  const location = useLocation();
  const presentRoute = useMemo(() => {
    return location.pathname + location.search;
  }, [location.pathname, location.search]);

  return (
    <TopNav>
      <div className="route-name-container">
        {startChild}
        <span className="route-name">{routeName}</span>
        <div className="filters">
          {pageFilters?.map((filter) => (
            <Link to={filter.route} key={filter.title}>
              <UiFilterTag
                title={filter.title}
                isActive={filter.route === presentRoute}
                value={filter.value}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="edge-container">
        {edgeChild}
        <div className="notification-icon">
          <UiIcon icon="Notification" />
        </div>
      </div>
    </TopNav>
  );
}

const TopNav = styled.nav`
  padding: ${pxToRem(12)} 0;
  height: ${pxToRem(72)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .route-name-container {
    display: flex;
    align-items: center;
    gap: ${pxToRem(24)};

    .filters {
      display: flex;
      align-items: center;
      gap: ${pxToRem(12)};
    }
  }

  .route-name {
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(20)};
    font-weight: 700;
    font-family: 'thiccboi-extrabold';
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
  }
`;

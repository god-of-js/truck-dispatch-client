import React from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

interface Props {
  routeName: string;
  startChild?: React.ReactNode;
  edgeChild?: React.ReactNode;
}
export default function DashboardTopNav({ routeName, edgeChild }: Props) {
  return (
    <TopNav>
      <div>
        <span className="route-name">{routeName}</span>
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
  height: ${pxToRem(48)};
  display: flex;
  align-items: center;
  justify-content: space-between;

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

import React, { lazy } from 'react';
import styled from 'styled-components';
import Trip from 'types/Trip';

const UiIcon = lazy(() => import('ui/UiIcon'));
interface Props {
  pickup: string;
  dropOff: string;
  status?: Trip['status'];
  variant?: 'gray' | 'light-primary';
}
export default function TripPickupAndDropOff({
  pickup,
  dropOff,
  variant = 'light-primary',
}: Props) {
  return (
    <TripPickupAndDropOffStyle className={variant}>
      <div className="indicator">
        <div className="from-icon-container">
          <UiIcon icon="Location" />
        </div>
        <div className="thread" />
        <div className="to-indicator" />
        <div className="to-icon-container">
          <UiIcon icon="LocationTick" />
        </div>
      </div>
      <div className="location-content">
        <div className="location-item">
          <div className="title">Pickup Address</div>
          <div className="value">{pickup}</div>
        </div>
        <div className="location-item">
          <div className="title">Delivery Address</div>
          <div className="value">{dropOff}</div>
        </div>
      </div>
    </TripPickupAndDropOffStyle>
  );
}

const TripPickupAndDropOffStyle = styled.div`
  display: flex;
  gap: ${pxToRem(12)};

  &.light-primary {
    .indicator {
      background: var(--color-primary-10);
    }
  }
  &.gray {
    .indicator {
      background: var(--color-gray-10);
    }
  }
  .title {
    text-transform: uppercase;
    font-weight: 400;
    font-size: ${pxToRem(10)};
    line-height: 1.5;
    letter-spacing: 0.05em;
    color: var(--color-gray-70);
  }

  .value {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;

    height: ${pxToRem(45)};
    color: var(--color-neutralBlack);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 2.8em; /* Adjust the value to control the number of lines displayed */
    line-height: 1.4em;
  }

  .indicator {
    display: flex;
    height: ${pxToRem(90)};
    flex-direction: column;
    align-items: center;
    gap: ${pxToRem(4)};
    border-radius: ${pxToRem(20)};
    padding: ${pxToRem(4)};

    .to-indicator {
      width: ${pxToRem(4)};
      height: ${pxToRem(4)};
      border: ${pxToRem(3)} solid var(--color-gray-400);
      border-radius: 50%;
    }

    .from-icon-container {
      svg {
        fill: var(--color-primary);
      }
    }
    .to-icon-container {
      svg {
        fill: var(--color-success);
      }
    }
  }

  .thread {
    border-left: 1px dashed var(--color-gray-80);
    height: 100%;
    background: var(--color-gray-400);
  }

  .location-content {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(24)};
  }
`;

import React from 'react';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';

interface Props {
  pickup: string;
  dropOff: string;
}
export default function TripPickupAndDropOff({ pickup, dropOff }: Props) {
  return (
    <TripPickupAndDropOffStyle>
      <div className="indicator">
        <UiIcon icon="MapPin" />
        <div className="thread" />
        <div className="thread" />
        <div className="thread" />
        <div className="to-indicator" />
      </div>
      <div className="location-content">
        <div>
          <div className="title">Pickup Address:</div>
          <div className="value">{pickup}</div>
        </div>
        <div>
          <div className="title">Delivery Address</div>
          <div className="value">{dropOff}</div>
        </div>
      </div>
    </TripPickupAndDropOffStyle>
  );
}

const TripPickupAndDropOffStyle = styled.div`
  display: flex;
  gap: ${pxToRem(24)};

  .title {
    font-size: ${pxToRem(14)};
    color: var(--color-gray-500);
  }

  .value {
    font-size: ${pxToRem(14)};
  }

  .indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${pxToRem(4)};

    .to-indicator {
      width: ${pxToRem(4)};
      height: ${pxToRem(4)};
      border: ${pxToRem(3)} solid var(--color-gray-400);
      border-radius: 50%;
    }
  }

  .thread {
    width: ${pxToRem(1)};
    background: var(--color-gray-400);
    &:first-of-type {
      height: 25%;
    }
    &:nth-of-type(2) {
      height: 15%;
    }
    &:nth-of-type(3) {
      height: 5%;
    }
  }

  .location-content {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(28)};
  }
`;

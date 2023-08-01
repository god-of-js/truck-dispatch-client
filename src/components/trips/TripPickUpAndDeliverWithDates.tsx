import { lazy } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';

const UiIcon = lazy(() => import('ui/UiIcon'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  pickUpAddress: string;
  pickUpDate: string;
  deliveryAddress: string;
  deliveryDate: string;
}
export default function TripPickUpAndDeliverWithDates({
  pickUpAddress,
  pickUpDate,
  deliveryAddress,
  deliveryDate,
}: Props) {
  return (
    <ComponentStyling>
      <div className="schedule">
        <div>
          <div className="pick-up-icon-container icon-container">
            <UiIcon icon="Location" />
          </div>
        </div>
        <div className="details">
          <div className="detail">
            <div className="detail-title">Pickup Address</div>
            <div className="detail-value">{pickUpAddress}</div>
          </div>
          <div className="detail">
            <div className="detail-title">Pickup Date</div>
            <div className="detail-value">{pickUpDate}</div>
          </div>
        </div>
      </div>
      <div className="arrow-icon-container">
        <UiButton variant="icon-neutral" disabled>
          <UiIcon icon="ArrowRight" />
        </UiButton>
      </div>
      <div className="schedule">
        <div>
          <div className="delivery-icon-container icon-container">
            <UiIcon icon="LocationTick" />
          </div>
        </div>
        <div className="details">
          <div className="detail">
            <div className="detail-title">Delivery Address</div>
            <div className="detail-value">{deliveryAddress}</div>
          </div>
          <div className="detail">
            <div className="detail-title">Delivery Date</div>
            <div className="detail-value">{deliveryDate}</div>
          </div>
        </div>
      </div>
    </ComponentStyling>
  );
}

const ComponentStyling = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(32)};

  .schedule {
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: ${pxToRem(12)};

    .icon-container {
      border-radius: ${pxToRem(8)};
      width: ${pxToRem(32)};
      height: ${pxToRem(32)};
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: ${pxToRem(14)};
        height: ${pxToRem(17)};
      }

      &.pick-up-icon-container {
        background: var(--color-primary-10);

        svg {
          fill: var(--color-primary);
        }
      }
      &.delivery-icon-container {
        background: var(--color-primary-10);

        svg {
          fill: var(--color-success);
        }
      }
    }

    .details {
      display: grid;
      gap: ${pxToRem(24)};
    }

    .detail-title {
      font-style: normal;
      font-weight: 400;
      font-size: ${pxToRem(10)};
      line-height: 140%;
      letter-spacing: 0.05em;
      color: var(--color-gray-70);
      text-transform: uppercase;
    }
    .detail-value {
      font-style: normal;
      font-weight: 600;
      font-size: ${pxToRem(16)};
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      margin-top: ${pxToRem(8)};
    }
  }

  .arrow-icon-container {
    display: none;
  }

  @media screen and (min-width: ${sizes.mobileLargeWidth}) {
    flex-direction: row;
    justify-content: space-between;

    .arrow-icon-container {
      display: flex;
      align-self: center;
    }
  }
`;

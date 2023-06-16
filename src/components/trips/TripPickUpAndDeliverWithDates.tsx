import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';

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
  gap:32px;

  .schedule {
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap:12px;

    .icon-container {
      border-radius:8px;
      width:32px;
      height:32px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width:14px;
        height:17px;
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
      gap:24px;
    }

    .detail-title {
      font-style: normal;
      font-weight: 400;
      font-size:10px;
      line-height: 140%;
      letter-spacing: 0.05em;
      color: var(--color-gray-70);
      text-transform: uppercase;
    }
    .detail-value {
      font-style: normal;
      font-weight: 600;
      font-size:16px;
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      margin-top:8px;
    }
  }

  .arrow-icon-container {
    display: none;
  }

  @media screen and (min-width: ${sizes.mobileLargeWidth}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .arrow-icon-container {
      display: block;
    }
  }
`;

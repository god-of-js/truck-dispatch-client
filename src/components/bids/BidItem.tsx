import styled from 'styled-components';
import Bid from 'types/Bid';
import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import UiDataField from 'ui/UiDataField';
import UiIcon from 'ui/UiIcon';
import UiPill from 'ui/UiPill';
import { abbreviateNumber, convertToFullDate } from 'utils/helpers';

interface Props {
  bid: Bid;
  edit: (jobId: string) => void;
}
export default function BidItem({ bid, edit }: Props) {
  return (
    <BidItemStyling>
      <header className="bid-header">
        <div className="user-profile">
          <UiAvatar avatar={bid.trip.tripOwner.avatar} isHalfCurved />
          <div className="user-profile__details">
            <div className="name">{`${bid.trip.tripOwner.firstName} ${bid.trip.tripOwner.lastName}`}</div>
            <div className="user-type">{bid.trip.tripOwner.userType}</div>
          </div>
        </div>
        <div className="time-of-creation">
          {convertToFullDate(bid.createdAt)}
        </div>
      </header>
      <div className="bid-body">
        <div className="proposed-trip-cost-and-status-container">
          <div>
            <div className="field-title">PROPOSED TRIP COST</div>
            <div className="proposed-trip-cost">
              <span className="proposed-trip-cost__currency">NGN</span>
              <span className="proposed-trip-cost__value">
                {abbreviateNumber(bid.price)}
              </span>
            </div>
          </div>
          <UiPill variant="warning">Pending</UiPill>
        </div>
        <div className="vehicle-details">
          <div className="field">
            <div className="field-title">Driver</div>
            <div className="driver-details">
              <UiAvatar avatar={bid.vehicle.driver.avatar} />
              <div>
                <div className="field-value">{`${bid.vehicle.driver.name}`}</div>
                <div className="field-sub-value">{`${bid.vehicle.driver.phone}`}</div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="field-title">Truck</div>
            <div>
              <div className="field-value">{bid.vehicle.vehicleType}</div>
              <div className="field-sub-value--bold  field-sub-value">
                {bid.vehicle.plateNumber}
              </div>
            </div>
          </div>
          <div className="field">
            <div className="field-title">Current Truck Location</div>
            <div className="field-value">{bid.presentLocation}</div>
          </div>
        </div>
        <UiDataField
          title="Extra Notes"
          value={bid.extraNotes}
          variant="text-area"
        />
        <div className="btn-container">
          <UiButton onClick={() => edit(bid.trip._id)}>
            <UiIcon icon="ReceiptEdit" /> Edit Bid
          </UiButton>
          <UiButton variant="danger-secondary">
            <UiIcon icon="Trash" />
          </UiButton>
        </div>
      </div>
    </BidItemStyling>
  );
}

const BidItemStyling = styled.div`
  background: #fff;
  border-radius: ${pxToRem(16)};
  overflow: hidden;
  height: fit-content;
  display: grid;

  .bid-header {
    background: var(--color-primary-10);
    padding: ${pxToRem(18)} ${pxToRem(24)};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-profile {
      display: flex;
      align-items: center;
      gap: ${pxToRem(8)};

      .name {
        font-style: normal;
        font-weight: 700;
        font-size: ${pxToRem(14)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
      }
      .user-type {
        font-style: normal;
        font-weight: 400;
        font-size: ${pxToRem(10)};
        line-height: 140%;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-gray-80);
      }
    }
    .time-of-creation {
      font-style: normal;
      font-weight: 500;
      font-size: ${pxToRem(12)};
      line-height: 140%;
      text-align: right;
      letter-spacing: -0.02em;
      color: var(--color-gray-80);
    }
  }
  .bid-body {
    padding: ${pxToRem(32)} ${pxToRem(24)};
    display: grid;
    gap: ${pxToRem(32)};
    .field {
      display: grid;
      gap: ${pxToRem(12)};

      &-title {
        font-style: normal;
        font-weight: 400;
        font-size: ${pxToRem(10)};
        line-height: 140%;
        letter-spacing: 0.05em;
        color: var(--color-gray-80);
        text-transform: uppercase;
      }

      &-value {
        font-weight: 700;
        font-size: ${pxToRem(14)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
      }
      &-sub-value {
        font-weight: 400;
        font-size: ${pxToRem(14)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-gray-80);

        &--bold {
          font-weight: 700;
        }
      }
    }

    .proposed-trip-cost-and-status-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: ${pxToRem(20)};
      border-bottom: ${pxToRem(1)} solid var(--color-gray-30);

      .proposed-trip-cost {
        display: flex;
        align-items: flex-end;
        gap: ${pxToRem(2)};
        font-style: normal;
        font-weight: 600;
        font-size: ${pxToRem(24)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
        &__currency {
          font-size: ${pxToRem(14)};
        }
      }
    }
    .vehicle-details {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: ${pxToRem(24)};

      .driver-details {
        display: flex;
        align-items: center;
        gap: ${pxToRem(8)};
      }
    }

    .btn-container {
      display: flex;
      gap: ${pxToRem(12)};

      button {
        &:first-child {
          width: ${pxToRem(180)};
        }
      }
    }
  }
`;

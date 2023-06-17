import { lazy } from 'react';
import styled from 'styled-components';
import { abbreviateNumber, convertToFullDate } from 'utils/helpers';
import Bid from 'types/Bid';

const UiPill = lazy(() => import('ui/UiPill'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiDataField = lazy(() => import('ui/UiDataField'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));
const UiIcon = lazy(() => import('ui/UiIcon'));

interface Props {
  bid: Bid;
  edit: (jobId: string) => void;
  deleteItem: (bidId: string, tripId: string) => void;
}
export default function BidItem({ bid, edit, deleteItem }: Props) {
  return (
    <BidItemStyling className="bid-item">
      <header className="bid-header">
        <div className="user-profile">
          <UiAvatar avatar={bid.trip.tripOwner?.avatar} isHalfCurved />
          <div className="user-profile__details">
            <div className="name">{`${bid.trip.tripOwner?.firstName} ${bid.trip.tripOwner?.lastName}`}</div>
            <div className="user-type">{bid.trip.tripOwner?.userType}</div>
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
          <UiButton
            onClick={() => {
              deleteItem(bid._id, bid.trip._id);
            }}
            variant="danger-secondary"
          >
            <UiIcon icon="Trash" />
          </UiButton>
        </div>
      </div>
    </BidItemStyling>
  );
}

const BidItemStyling = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  height: fit-content;
  display: grid;

  .bid-header {
    background: var(--color-primary-10);
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-profile {
      display: flex;
      align-items: center;
      gap: 8px;

      .name {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
      }
      .user-type {
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 140%;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-gray-80);
      }
    }
    .time-of-creation {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 140%;
      text-align: right;
      letter-spacing: -0.02em;
      color: var(--color-gray-80);
    }
  }
  .bid-body {
    padding: 32px 24px;
    display: grid;
    gap: 32px;
    .field {
      display: grid;
      gap: 12px;

      &-title {
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 140%;
        letter-spacing: 0.05em;
        color: var(--color-gray-80);
        text-transform: uppercase;
      }

      &-value {
        font-weight: 700;
        font-size: 14px;
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
      }
      &-sub-value {
        font-weight: 400;
        font-size: 14px;
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
      padding-bottom: 20px;
      border-bottom: 1px solid var(--color-gray-30);

      .proposed-trip-cost {
        display: flex;
        align-items: flex-end;
        gap: 2px;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
        &__currency {
          font-size: 14px;
        }
      }
    }
    .vehicle-details {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;

      .driver-details {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .btn-container {
      display: flex;
      gap: 12px;

      button {
        &:first-child {
          width: 180px;
        }
      }
    }
  }
`;

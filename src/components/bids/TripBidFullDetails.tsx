import { lazy } from 'react';
import styled from 'styled-components';

import {
  abbreviateNumber,
  formatUserType,
  priceWithTDPercent,
} from 'utils/helpers';
import Bid from 'types/Bid';
import sizes from 'utils/sizes';

const Ratings = lazy(() => import('components/ratings/Ratings'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiDataField = lazy(() => import('ui/UiDataField'));
const UiModal = lazy(() => import('ui/UiModal'));
const UserDetails = lazy(() => import('ui/UserDetails'));

interface Props {
  bid: Bid;
  onClose: () => void;
  negotiate: (bidId: string) => void;
  accept: (bidId: string) => void;
  isVisible: boolean;
}
export default function TripBidFullDetails({
  bid,
  onClose,
  negotiate,
  accept,
  isVisible,
}: Props) {
  return (
    <UiModal isVisible={isVisible} onClose={onClose} title="Bid Details">
      <BidDetailsStyling>
        <div className="transporter-profile">
          <UserDetails
            userName={`${bid.transporter.firstName} ${bid.transporter.lastName}`}
            avatar={bid.transporter.avatar}
            userId={bid.transporter._id}
            profileSubtitle={formatUserType(bid.transporter.userType)}
            size="sm"
            showMessage
            showViewProfile
          />
        </div>

        <div className="content">
          <div className="grid-3">
            <UiDataField
              title="Number of Vehicles"
              value={bid.transporter.noOfVehicles}
            />
            <UiDataField
              title="Completed Trips"
              value={bid.transporter.completedTrips}
            />
            <UiDataField
              title="Transporter Rating"
              value={<Ratings rating={bid.transporter.rating} />}
            />
          </div>
          <div className="grid-2">
            <div className="location-container">
              <UiDataField
                title="Current vehicle location"
                value={bid.presentLocation}
                icon="Location"
              />
            </div>
            <UiDataField
              title="Proposed trip price"
              value={
                <div className="price">
                  &#8358;{abbreviateNumber(priceWithTDPercent(bid.price))}
                </div>
              }
            />
          </div>
          <div className="extra-notes">
            <UiDataField title="Extra notes" value={bid.extraNotes} />
          </div>
        </div>

        <div className="action-btns">
          <UiButton variant="secondary" onClick={() => negotiate(bid._id)}>
            Negotiate Bid
          </UiButton>
          <UiButton onClick={() => accept(bid._id)}>Accept Bid</UiButton>
        </div>
      </BidDetailsStyling>
    </UiModal>
  );
}

const BidDetailsStyling = styled.div`
  padding: 26px 24px;
  display: grid;
  gap: 32px;

  .transporter-profile {
    width: fit-content;
  }

  .content {
    display: grid;
    gap: 12px;
  }
  .grid-3 {
    display: grid;
    gap: 12px;
    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .grid-2 {
    display: grid;
    gap: 12px;

    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .location-container {
    svg {
      fill: var(--color-primary);
    }
  }
  .price {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }
  .extra-notes {
    .ui-data-field {
      min-height: 116px;
    }
  }
  .action-btns {
    display: flex;
    gap: 16px;
    justify-content: center;
    padding-top: 8px;

    button {
      min-width: 136px;
    }
  }
`;

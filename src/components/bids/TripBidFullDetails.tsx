import Ratings from 'components/ratings/Ratings';
import styled from 'styled-components';
import Bid from 'types/Bid';
import UiButton from 'ui/UiButton';
import UiDataField from 'ui/UiDataField';
import UiModal from 'ui/UiModal';
import UserDetails from 'ui/UserDetails';
import {
  abbreviateNumber,
  formatUserType,
  priceWithTDPercent,
} from 'utils/helpers';

interface Props {
  bid: Bid;
  onClose: () => void;
}
export default function TripBidFullDetails({ bid, onClose }: Props) {
  return (
    <UiModal onClose={onClose} title="Bid Details">
      <BidDetailsStyling>
        <div className="transporter-profile">
          <UserDetails
            userName={`${bid.transporter.firstName} ${bid.transporter.lastName}`}
            avatar={bid.transporter.avatar}
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
            <UiDataField
              title="Current vehicle location"
              value={bid.presentLocation}
            />
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
          <UiButton variant="secondary">Negotiate Bid</UiButton>
          <UiButton>Accept Bid</UiButton>
        </div>
      </BidDetailsStyling>
    </UiModal>
  );
}

const BidDetailsStyling = styled.div`
  padding: ${pxToRem(26)} ${pxToRem(24)};
  display: grid;
  gap: ${pxToRem(32)};

  .transporter-profile {
    width: fit-content;
  }

  .content {
    display: grid;
    gap: ${pxToRem(12)};
  }
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${pxToRem(12)};
  }
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(12)};
  }
  .price {
    font-style: normal;
    font-weight: 600;
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(38)};
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }
  .extra-notes {
    .ui-data-field {
      min-height: ${pxToRem(116)};
    }
  }
  .action-btns {
    display: flex;
    gap: ${pxToRem(16)};
    justify-content: center;
    padding-top: ${pxToRem(8)};

    button {
      min-width: ${pxToRem(136)};
    }
  }
`;

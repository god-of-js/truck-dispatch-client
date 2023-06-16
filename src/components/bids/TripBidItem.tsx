import Ratings from 'components/ratings/Ratings';
import { useMemo } from 'react';
import styled from 'styled-components';
import Bid from 'types/Bid';
import UiButton from 'ui/UiButton';
import UiDropDownMenu, { DropDownData } from 'ui/UiDropdownMenu';
import UiIcon from 'ui/UiIcon';
import UserDetails from 'ui/UserDetails';
import { abbreviateNumber, priceWithTDPercent } from 'utils/helpers';
import sizes from 'utils/sizes';

interface Props {
  bid: Bid;
  negotiate: (bidId: string) => void;
  accept: (bidId: string) => void;
  viewBidDetails: (bidId: string) => void;
  viewSenderDetails: (bidId: string) => void;
}
export default function TripBidItem({
  bid,
  accept,
  negotiate,
  viewBidDetails,
  viewSenderDetails,
}: Props) {
  const options: DropDownData[] = [
    // {
    //   label: 'Transporter Profile',
    //   icon: 'User',
    //   endIcon: 'CaretRight',
    //   func: viewBidDetails,
    // },
    {
      label: 'Bid Details',
      icon: 'InfoCircleOutline',
      endIcon: 'CaretRight',
      func: viewBidDetails,
    },
  ];

  const formattedUserType = useMemo(() => {
    if (bid.transporter.userType === 'transport') return 'TRANSPORTER';

    return 'TRANSPORT COMPANY';
  }, [bid.transporter]);

  return (
    <TripBidItemStyling>
      <header>
        <UserDetails
          userName={`${bid.transporter.firstName} ${bid.transporter.lastName}`}
          avatar={bid.transporter.avatar}
          size="sm"
          profileSubtitle={formattedUserType}
        />
        <UiDropDownMenu options={options} itemId={bid._id} />
      </header>

      <div className="fields ">
        <div className="double-field-item">
          <div>
            <div className="field-name">Number of vehicles</div>
            <div className="field-value">{bid.transporter.noOfVehicles}</div>
          </div>
          <div>
            <div className="field-name">Completed Trips</div>
            <div className="field-value">{bid.transporter.completedTrips}</div>
          </div>
        </div>

        <div className="field-item vehicle-location">
          <UiIcon icon="Location" />
          <div>
            <div className="field-name">Vehicle current Location</div>
            <div className="field-value">{bid.presentLocation}</div>
          </div>
        </div>

        <div className="field-item--without-border">
          <div>
            <div className="field-name">Transporter Rating</div>
            <div className="field-value">
              <Ratings rating={bid.transporter.rating} />
            </div>
          </div>

          <div>
            <div className="field-name">Proposed trip price</div>
            <div className="price">
              &#8358;{abbreviateNumber(priceWithTDPercent(bid.price))}
            </div>
          </div>
        </div>

        <SubmitButtonContainer>
          <UiButton
            variant="secondary"
            isFullWidth
            onClick={() => negotiate(bid._id)}
          >
            Negotiate Bid
          </UiButton>
          <UiButton isFullWidth onClick={() => accept(bid._id)}>
            Accept Bid
          </UiButton>
        </SubmitButtonContainer>
      </div>
    </TripBidItemStyling>
  );
}

const TripBidItemStyling = styled.div`
  max-width:332px;
  border-radius:16px;
  background: #ffffff;
  width: 100%;
  font-weight: 600;
  font-size:16px;

  @media screen and (min-width: ${sizes.mobileSmall}) {
    min-width:320px;
  }

  header {
    background: var(--color-primary-10);
    padding:24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:12px;
    border-top-left-radius:16px;
    border-top-right-radius:16px;

    .user-details-name {
      color: var(--color-gray-80);
    }
  }

  .field-name {
    text-transform: uppercase;
    font-style: normal;
    font-weight: 400;
    font-size:10px;
    color: var(--color-gray-70);
    line-height: 140%;
    letter-spacing: 0.05em;
    margin-bottom:8px;
  }

  .field-value {
    font-style: normal;
    font-weight: 600;
    font-size:14px;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .field-item,
  .double-field-item {
    border-bottom:1px solid var(--color-gray);
    padding:0px 0 16px 0;
  }

  .double-field-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap:16px;
    padding:16px 24px 24px 24px;
  }
  .field-item--without-border {
    display: flex;
    flex-direction: column;
    gap:20px;
  }
  .price {
    font-style: normal;
    font-weight: 600;
    font-size:28px;
    line-height:32px;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .vehicle-location {
    display: flex;
    align-items: flex-start;
    gap:8px;
    svg {
      fill: var(--color-primary);
    }
  }
`;

const SubmitButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

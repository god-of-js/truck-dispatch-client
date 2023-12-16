import { lazy, useMemo } from 'react';
import styled from 'styled-components';
import Bid from 'types/Bid';
import { abbreviateNumber, priceWithTDPercent } from 'utils/helpers';
import sizes from 'utils/sizes';
import { DropDownData } from 'ui/UiDropdownMenu';

const Ratings = lazy(() => import('components/ratings/Ratings'));
const UiButton = lazy(() => import('ui/UiButton'));
const UserDetails = lazy(() => import('ui/UserDetails'));
const UiDropDownMenu = lazy(() => import('ui/UiDropdownMenu'));
const UiIcon = lazy(() => import('ui/UiIcon'));

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
    {
      label: 'Transporter Profile',
      icon: 'User',
      endIcon: 'CaretRight',
      func: viewSenderDetails,
    },
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
  max-width: ${pxToRem(332)};
  border-radius: ${pxToRem(16)};
  background: #ffffff;
  width: 100%;
  font-weight: 600;
  font-size: ${pxToRem(16)};

  @media screen and (min-width: ${sizes.mobileSmall}) {
    min-width: ${pxToRem(320)};
  }

  header {
    background: var(--color-primary-10);
    padding: ${pxToRem(24)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${pxToRem(12)};
    border-top-left-radius: ${pxToRem(16)};
    border-top-right-radius: ${pxToRem(16)};

    .user-details-name {
      color: var(--color-gray-80);
    }
  }

  .field-name {
    text-transform: uppercase;
    font-style: normal;
    font-weight: 400;
    font-size: ${pxToRem(10)};
    color: var(--color-gray-70);
    line-height: 140%;
    letter-spacing: 0.05em;
    margin-bottom: ${pxToRem(8)};
  }

  .field-value {
    font-style: normal;
    font-weight: 600;
    font-size: ${pxToRem(14)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .field-item,
  .double-field-item {
    border-bottom: ${pxToRem(1)} solid var(--color-gray);
    padding: ${pxToRem(0)} 0 ${pxToRem(16)} 0;
  }

  .double-field-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
    padding: ${pxToRem(16)} ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(24)};
  }
  .field-item--without-border {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(20)};
  }
  .price {
    font-style: normal;
    font-weight: 600;
    font-size: ${pxToRem(28)};
    line-height: ${pxToRem(32)};
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .vehicle-location {
    display: flex;
    align-items: flex-start;
    gap: ${pxToRem(8)};
    svg {
      fill: var(--color-primary);
    }
  }
`;

const SubmitButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${pxToRem(12)};
`;

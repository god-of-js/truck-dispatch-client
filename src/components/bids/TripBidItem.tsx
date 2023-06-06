import { useMemo } from 'react';
import styled from 'styled-components';
import Bid from 'types/Bid';
import UiButton from 'ui/UiButton';
import UiDropDownMenu from 'ui/UiDropdownMenu';
import UserDetails from 'ui/UserDetails';
import sizes from 'utils/sizes';

interface Props {
  bid: Bid;
}
export default function TripBidItem({ bid }: Props) {
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
        <UiDropDownMenu options={[]} />
      </header>

      <div className="fields">
        <div className="field-item">
          <div className="field-name">Type of Goods</div>
          <div className="type-of-goods-value">Lorem ipsum</div>
        </div>

        <div className="field-item"></div>

        <div className="field-item date-container">
          <div>
            <div className="field-name">PickUp date</div>
            <div className="field-value">date</div>
          </div>

          <div>
            <div className="field-name">Delivery date</div>
            <div className="field-value">date</div>
          </div>
        </div>

        <SubmitButtonContainer className="submit-button-tripbiditemstyling">
          <UiButton>{bid ? 'Update Bid' : 'bid now'}</UiButton>
          <UiButton variant="secondary">View full Details</UiButton>
        </SubmitButtonContainer>
      </div>
    </TripBidItemStyling>
  );
}

const TripBidItemStyling = styled.div`
  max-width: ${pxToRem(332)};
  border-radius: ${pxToRem(16)};
  overflow: hidden;
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
  }

  .field-value {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .field-item {
    border-bottom: ${pxToRem(1)} solid var(--color-gray);
    padding: ${pxToRem(0)} 0 ${pxToRem(16)} 0;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
    padding: ${pxToRem(16)} ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(24)};
  }

`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(16)};

  & button:last-child {
    flex-grow: 1;
  }
`;

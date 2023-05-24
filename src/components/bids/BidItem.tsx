import styled from 'styled-components';
import Bid from 'types/Bid';
import UiAvatar from 'ui/UiAvatar';
import { convertToFullDate } from 'utils/helpers';

interface Props {
  bid: Bid;
}
export default function BidItem({ bid }: Props) {
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
        <div className="time-of-creation">{convertToFullDate(bid.createdAt)}</div>
      </header>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quaerat culpa
      et assumenda? Doloremque alias libero dolores molestias a dolore sapiente
      fuga repellat assumenda repudiandae omnis veritatis, natus illo ipsam?
    </BidItemStyling>
  );
}

const BidItemStyling = styled.div`
  background: #fff;
  border-radius: ${pxToRem(16)};
  overflow: hidden;
  height: fit-content;
  display: grid;
  gap: ${pxToRem(30)};
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
`;

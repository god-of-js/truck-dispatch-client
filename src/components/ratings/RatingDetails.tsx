import Rating from 'types/Rating';
import UiAvatar from 'ui/UiAvatar';
import Ratings from './Ratings';
import styled from 'styled-components';
import sizes from 'utils/sizes';

interface Props {
  rating: Rating;
}
export default function RatingDetails({ rating }: Props) {
  function getDate(timestamp: string) {
    const dateFromTimestamp = new Date(timestamp);

    const year = dateFromTimestamp.getFullYear();
    const month = String(dateFromTimestamp.getMonth() + 1).padStart(2, '0');
    const day = String(dateFromTimestamp.getDate()).padStart(2, '0');

    const formattedDate = `${year} - ${month} - ${day}`;

    return formattedDate;
  }

  return (
    <RatingDetailsStyle key={rating._id}>
      <div className="raiting-container">
        <div className="user-details-container">
          <div className="user-details">
            <UiAvatar size="lg" />
            <div className="user-data">
              <div className="user-name">Anonymous</div>
              <div>SHIPPER</div>
            </div>
          </div>
        </div>
        <div className="comment-container">
          <div className="user-rating">
            <Ratings rating={rating.starRating} />
            <div className="rating-date">{getDate(rating.createdAt)}</div>
          </div>
          <div className="user-comment">{rating.comment}</div>
        </div>
      </div>
    </RatingDetailsStyle>
  );
}

const RatingDetailsStyle = styled.div`
  margin: ${pxToRem(32)} 0;

  .raiting-container {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(32)};
    color: var(--neutral-shades-grey-80, #57575b);
    font-size: ${pxToRem(14)};
    font-style: normal;
    font-weight: 400;
    line-height: ${pxToRem(24)};
  }

  .user-details {
    display: flex;
    gap: ${pxToRem(16)};
    align-items: center;
    width: 244px;

    .user-data {
      display: flex;
      flex-direction: column;
      gap: ${pxToRem(12)};

      .user-name {
        color: var(--neutral-black, #15131b);
        font-weight: 600;
      }
    }
  }

  .comment-container {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
    width: ${pxToRem(588)};

    .user-rating {
      display: flex;
      gap: ${pxToRem(8)};
      align-items: center;

      .rating-date {
        font-weight: 600;
      }
    }

    .user-comment {
      color: #272727;
      line-height: 140%;
    }
  }

  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    .raiting-container {
      flex-direction: row;
    }
  }
`;

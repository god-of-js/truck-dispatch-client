import Rating from 'types/Rating';
import UiAvatar from 'ui/UiAvatar';
import Ratings from './Ratings';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import { useMemo } from 'react';
import User from 'types/User';

interface Props {
  rating: Rating;
}
export default function RatingDetails({ rating }: Props) {
  const userName = useMemo(
    () =>
      `${(rating.userRating as User).firstName} ${
        (rating.userRating as User).lastName
      }`,
    [rating],
  );
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
      <UiAvatar size="lg" avatar={(rating.userRating as User).avatar} />
      <div>
        <div className="user-name">{userName}</div>

        <div className="comment-container">
          <div className="rating-details">
            <Ratings size="s" rating={rating.starRating} />
            <div className="rating-date">{getDate(rating.createdAt)}</div>
          </div>
          <div className="user-comment">{rating.comment}</div>
        </div>
      </div>
    </RatingDetailsStyle>
  );
}

const RatingDetailsStyle = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  color: var(--color-gray-80);
  font-size: ${pxToRem(14)};
  font-style: normal;
  font-weight: 400;
  line-height: ${pxToRem(24)};

  .user-name {
    color: var(--neutral-black, #15131b);
    font-weight: 600;
  }

  .comment-container {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
    max-width: ${pxToRem(588)};

    .rating-details {
      display: flex;
      gap: ${pxToRem(12)};
      align-items: center;

      .rating-date {
        font-weight: 600;
        font-size: ${pxToRem(12)};
      }
    }

    .user-comment {
      color: #272727;
      line-height: 140%;
    }
  }

  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    .rating-container {
      flex-direction: row;
    }
  }
`;

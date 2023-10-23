import Rating from 'types/Rating';
import UiAvatar from 'ui/UiAvatar';
import Ratings from './Ratings';

interface Props {
  rating: Rating;
}
export default function RatingDetails({ rating }: Props) {
  function getDate(timestamp: string) {
    const dateFromTimestamp = new Date(timestamp);

    const formattedDate = dateFromTimestamp.toISOString().split('T')[0];

    return formattedDate;
  }
  return (
    <div key={rating._id} className="user-review-container">
      <div className="user-review">
        <div className="user-details-container">
          <div className="user-details">
            <UiAvatar size="lg" />
            <div className="user-data">
              <div className="user-anon">Anonymous</div>
              <div>SHIPPER</div>
            </div>
          </div>
        </div>
        <div className="comment-container">
          <div className="user-date">
            <Ratings rating={rating.starRating} />
            <div className="comment-date">{getDate(rating.createdAt)}</div>
          </div>
          <div className="user-comment">{rating.comment}</div>
        </div>
      </div>
    </div>
  );
}

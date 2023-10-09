import React, { lazy, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from 'types/Rating';
import UserFullProfile from 'types/UserFullProfile';
import sizes from 'utils/sizes';

const Ratings = lazy(() => import('components/ratings/Ratings'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiDataField = lazy(() => import('ui/UiDataField'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const VehicleComponent = lazy(() => import('components/vehicles/VehicleItem'));
const RatingsComponent = lazy(
  () => import('components/ratings/RatingsComponent'),
);

interface Props {
  user: UserFullProfile;
  messageUser: () => void;
}

export default function UserProfile({ user, messageUser }: Props) {
  const vehicles = useMemo(() => {
    if (!user.vehicles) return;
    return user.vehicles.slice(0, 3);
  }, [user]);

  const ratings = useMemo<Rating[]>(() => {
    return user.ratings;
  }, [user]);

  function calculateAverageStarRating(ratings: Rating[]): number {
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((accumulator) => {
      return accumulator + user.rating;
    }, 0);

    const average = (sum / (ratings.length * 5)) * 5;
    return average;
  }

  function getDate(timestamp: string) {
    const dateFromTimestamp = new Date(timestamp);

    const formattedDate = dateFromTimestamp.toISOString().split('T')[0];

    return formattedDate;
  }

  return (
    <>
      <UserProfileStyle>
        <UserHeaderDetail>
          <header>
            <div className="user-profile">
              <UiAvatar size="lg" avatar={user.avatar} isHalfCurved />
              <div>
                <div className="user-name">{`${user.lastName} ${user.firstName}`}</div>
                <div className="user-type">{user.userType}</div>
              </div>
            </div>
            <div className="button-container">
              <UiButton onClick={messageUser} variant="primary-secondary">
                <UiIcon icon="DoubleChat" />
                <span className="hidden">Message</span>
              </UiButton>
              <UiButton>Add to Contacts</UiButton>
            </div>
          </header>
        </UserHeaderDetail>
        <div className="p-32">
          <UserDataField>
            <UiDataField
              title="Trips Completed"
              isCentered
              isBordered
              value={user.completedTrips}
            />
            <UiDataField
              title="avg rating"
              isCentered
              isBordered
              value={user.rating}
            />
            <UiDataField
              title="no of reviews"
              isCentered
              isBordered
              value={user.ratings.length}
            />
            <UiDataField
              title="no of trucks"
              isCentered
              isBordered
              value={user.noOfVehicles}
            />
          </UserDataField>
          {vehicles && (
            <Vehicles>
              <h3>TRUCKS</h3>
              <div className="vehicle-data">
                {vehicles.map((vehicle) => (
                  <VehicleComponent
                    hidden
                    vehicle={vehicle}
                    key={vehicle._id}
                  />
                ))}
              </div>
              {user.vehicles?.length! > 3 && (
                <div className="btn-container">
                  <Link to={`/user/${user._id}/vehicles`}>
                    <UiButton variant="secondary">View all Vehicles</UiButton>
                  </Link>
                </div>
              )}
            </Vehicles>
          )}
          <UserReviewField>
            <div className="review-container">
              <h3>Transporter Reviews</h3>
              <div className="review-field">
                <div className="review-data-container">
                  <div className="review-data">
                    <div className="review-title">Total Reviews</div>
                    <div className="review-value">{user.ratings.length}</div>
                  </div>
                  <div className="review-data">
                    <div className="review-title">Average Rating</div>
                    <div className="review-value">
                      <div>{calculateAverageStarRating(ratings)}</div>
                      <Ratings rating={user.rating} />
                    </div>
                  </div>
                </div>
                <div className="review-data bottom-div">
                  <RatingsComponent ratings={ratings} />
                </div>
              </div>
            </div>

            {ratings.map((review) => (
              <div key={review._id} className="user-review-container">
                <div className="user-review">
                  <div className="user-details-container">
                    <div className="user-details">
                      <UiAvatar size="lg" />
                      <div className="user-data">
                        <div className="user-anon">Anonymous</div>
                        <div>SHIPPER</div>
                        <div>
                          Total Reviews:{' '}
                          <span className="user-number">{ratings.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comment-container">
                    <div className="user-date">
                      <Ratings rating={review.starRating} />
                      <div className="comment-date">
                        {getDate(review.createdAt)}
                      </div>
                    </div>
                    <div className="user-comment">{review.comment}</div>
                  </div>
                </div>
              </div>
            ))}
          </UserReviewField>
        </div>
      </UserProfileStyle>
    </>
  );
}

const UserProfileStyle = styled.div`
  border-radius: ${pxToRem(16)};
  overflow: hidden;
  background: #ffffff;
  padding-bottom: 32px;

  h3 {
    margin: 0;
    text-transform: uppercase;
    color: var(--color-grey-70, #848288);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0.8px;
  }

  .p-32 {
    padding: 0 ${pxToRem(32)};
  }
  .btn-container {
    display: flex;
    justify-content: center;
  }
`;

const UserHeaderDetail = styled.div`
  header {
    background: var(--color-primary-10);
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: ${pxToRem(36)} ${pxToRem(32)} ${pxToRem(21)} ${pxToRem(32)};
    margin-bottom: ${pxToRem(20)};

    .hidden {
      display: none;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: ${pxToRem(16)};

      .user-name {
        color: var(--neutralBlack, #15131b);
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: 0.48px;
      }
      .user-type {
        text-transform: uppercase;
        color: var(--color-grey-70, #848288);
        font-size: ${pxToRem(12)};
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: ${pxToRem(0.6)};
      }
    }
  }

  .button-container {
    display: flex;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(16)};
  }

  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    header {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .hidden {
        display: block;
      }
    }
  }
`;

const UserDataField = styled.div`
  border-bottom: 1px solid var(--color-gray-50);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${pxToRem(12)};
  padding-bottom: 32px;

  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    grid-template-columns: repeat(4, 1fr) !important;
  }
`;

const Vehicles = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid var(--color-gray-50);

  .vehicle-data {
    display: flex;
    justify-content: space-between;
  }
`;

const UserReviewField = styled.div`
  .review-container {
    padding: 32px 0;

    .review-field {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 32px 0;
      border-bottom: 1px solid var(--color-gray-50);
    }

    .review-data-container {
      display: flex;
      gap: 12px;
    }

    .review-data {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 50%;
      padding: 20px 16px;

      border-radius: 8px;
      background: var(--color-grey-20, #f8f7f9);

      &.bottom-div {
        width: inherit;
      }

      .review-title {
        color: var(--color-neutralBlack, #15131b);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
      }

      .review-value {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: var(--color-neutralBlack, #15131b);
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
      }
    }
  }

  .user-review-container {
    margin-bottom: 32px;

    .user-review {
      display: flex;
      flex-direction: column;
      gap: 32px;
      color: var(--color-grey-80, #57575b);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;

      .user-details {
        display: flex;
        align-items: center;
        width: 244px;
        gap: 16px;
      }

      .user-data {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .user-number {
          color: var(--color-grey-90, #2b2b2d);
          font-weight: 700;
        }

        .user-anon {
          color: var(----color-neutralBlack, #15131b);
        }
      }

      .comment-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .user-date {
          display: flex;
          align-items: center;
          gap: 8px;

          .comment-date {
            color: var(--color-grey-80, #57575b);
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px;
          }
        }
      }
    }
  }

  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    .review-field {
      display: flex;
      flex-direction: row !important;
      flex-wrap: wrap;

      .review-data {
        justify-content: center;
        width: 264px !important;
      }

      .review-value {
        flex-direction: row !important;
      }
    }

    .user-review {
      flex-direction: row !important;
    }
  }
`;

import React, { lazy, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import User from 'types/User';
import Rating from 'types/Rating';
import Ratings from 'components/ratings/Ratings';

const UiAvatar = lazy(() => import('ui/UiAvatar'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiDataField = lazy(() => import('ui/UiDataField'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const VehicleComponent = lazy(() => import('components/vehicles/VehicleItem'));
const RatingsComponent = lazy(
  () => import('components/ratings/RatingsComponent'),
);

interface Props {
  user: User;
  userId: string;
  jobId: string;
  negotiate: (jobid: string) => void;
}

export default function TransporterProfile({ jobId, user, negotiate }: Props) {
  const vehicles = useMemo(() => {
    return user.vehicles;
  }, [user]);

  const reviews = useMemo<Rating[]>(() => {
    return user.reviews;
  }, [user]);

  function calculateAverageStarRating(ratings: Rating[]): number {
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((accumulator) => {
      return accumulator + user.rating;
    }, 0);

    console.log(sum);

    const average = sum / ratings.length;
    return average;
  }

  function getDate(timestamp: string) {
    const dateFromTimestamp = new Date(timestamp);

    const formattedDate = dateFromTimestamp.toISOString().split('T')[0];

    return formattedDate;
  }

  return (
    <>
      <TransporterProfileStyle>
        <header>
          <div className="user-profile">
            <UiAvatar size="lg" avatar={user.avatar} isHalfCurved />
            <div>
              <div className="user-name">{`${user.lastName} ${user.firstName}`}</div>
              <div className="user-type">{user.userType}</div>
            </div>
          </div>
          <div className="button-container">
            <UiButton
              onClick={() => negotiate(jobId)}
              isFullWidth
              variant="primary-secondary"
            >
              <UiIcon icon="DoubleChat" />
              Message
            </UiButton>
            <UiButton>Add to Contacts</UiButton>
          </div>
        </header>
        <div className="container">
          <div className="data-field">
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
              value={user.reviews.length}
            />
            <UiDataField
              title="no of trucks"
              isCentered
              isBordered
              value={user.noOfVehicles}
            />
          </div>
          <div className="vehicle-field">
            <h3>TRUCKS</h3>
            <div className="vehicle-data">
              {vehicles.map((vehicle) => (
                <VehicleComponent hidden vehicle={vehicle} key={vehicle._id} />
              ))}
            </div>
          </div>
          <div className="review-container">
            <h3>Transporter Reviews</h3>
            <div className="review-field">
              <div className="review-data">
                <div className="review-title">Total Reviews</div>
                <div className="review-value">{user.reviews.length}</div>
              </div>
              <div className="review-data">
                <div className="review-title">Average Rating</div>
                <div className="review-value">
                  <div>{calculateAverageStarRating(reviews)}</div>
                  <Ratings rating={user.rating} />
                </div>
              </div>
              <RatingsComponent ratings={reviews} />
            </div>
          </div>
          {reviews.map((review) => (
            <div className="user-review-container">
              <div className="user-review">
                <div className="user-details">
                  <UiAvatar size="lg" />
                  <div className="user-data">
                    <div className="user-anon">Anonymous</div>
                    <div>SHIPPER</div>
                    <div>
                      Total Reviews:{' '}
                      <span className="user-number">{reviews.length}</span>
                    </div>
                  </div>
                </div>
                <div className="comment-container">
                  <div className="user-date">
                    <Ratings rating={user.rating} />
                    <div className="comment-date">
                      {getDate(review.createdAt)}
                    </div>
                  </div>
                  <div className="user-comment">{review.comment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TransporterProfileStyle>
    </>
  );
}

const TransporterProfileStyle = styled.div`
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

  header {
    background: var(--color-primary-10);
    padding: ${pxToRem(36)} ${pxToRem(32)} ${pxToRem(21)} ${pxToRem(32)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${pxToRem(20)};

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

  .container {
    padding: 0 ${pxToRem(32)};

    .data-field {
      border-bottom: 1px solid var(--color-gray-50);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: ${pxToRem(12)};
      padding-bottom: 32px;
    }

    .vehicle-field {
      padding: 32px 0;
      border-bottom: 1px solid var(--color-gray-50);

      .vehicle-data {
        display: flex;
      }
    }

    .review-container {
      padding: 32px 0;

      .review-field {
        display: flex;
        gap: 12px;
        padding: 32px 0;
        border-bottom: 1px solid var(--color-gray-50);
      }

      .review-data {
        display: flex;
        flex-direction: column;
        gap: 24px;
        height: 120px;
        justify-content: center;
        width: 264px;
        padding: 20px 16px;
        border-radius: 8px;
        background: var(--color-grey-20, #f8f7f9);

        .review-title {
          color: var(--color-neutralBlack, #15131b);
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px;
        }

        .review-value {
          display: flex;
          gap: 8px;
          color: var(--color-neutralBlack, #15131b);
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
        }
      }
    }

    .user-review-container {
      display: flex;
      flex-direction: column;
      gap: 32px;

      .user-review {
        display: flex;
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
  }

  .button-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(12)};
  }
`;

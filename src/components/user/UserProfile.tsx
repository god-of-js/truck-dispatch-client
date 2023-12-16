import RatingsStatistics from 'components/ratings/RatingsStatistics';
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
const VehicleItem = lazy(() => import('components/vehicles/VehicleItem'));
const RatingDetails = lazy(() => import('components/ratings/RatingDetails'));
const RatingsComponent = lazy(
  () => import('components/ratings/RatingsFrequency'),
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
    return user.ratings.filter((rating) => !!rating.comment);
  }, [user]);

  return (
    <UserProfileStyle>
      <UserProfileHeader>
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
            <span className="hidden-in-mobile">Message</span>
          </UiButton>
          {false && <UiButton>Add to Contacts</UiButton>}
        </div>
      </UserProfileHeader>
      <div className="p-32">
        <UserDataFields>
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
        </UserDataFields>
        {vehicles && (
          <Vehicles>
            <h3>TRUCKS</h3>
            <div className="vehicles">
              {vehicles.map((vehicle) => (
                <VehicleItem vehicle={vehicle} key={vehicle._id} />
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
        <UserReviews>
          <RatingsStatistics ratings={ratings} user={user} />
          <div className="ratings">
            {ratings.map((rating) => (
              <RatingDetails rating={rating} key={rating._id} />
            ))}
          </div>
        </UserReviews>
      </div>
    </UserProfileStyle>
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
    color: var(--color-gray-70);
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

const UserProfileHeader = styled.header`
  background: var(--color-primary-10);
  display: flex;
  gap: 16px;
  padding: ${pxToRem(36)} ${pxToRem(32)} ${pxToRem(21)} ${pxToRem(32)};
  margin-bottom: ${pxToRem(20)};
  align-items: center;
  justify-content: space-between;
  .hidden-in-mobile {
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

  .button-container {
    display: flex;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(16)};
  }

  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    .hidden-in-mobile {
      display: block;
    }
  }
`;

const UserDataFields = styled.div`
  border-bottom: 1px solid var(--color-gray-50);
  display: grid;
  grid-template-columns: 1fr;
  gap: ${pxToRem(12)};
  padding-bottom: 32px;

  @media screen and (min-width: ${sizes.mobileSmall}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${sizes.tabletSmallWidth}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Vehicles = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid var(--color-gray-50);

  .vehicles {
    display: flex;
    flex-wrap: wrap;
    gap: ${pxToRem(16)};
  }
`;

const UserReviews = styled.div`
  .ratings {
    padding: ${pxToRem(32)} 0;
    display: grid;
    gap: ${pxToRem(32)};
  }
`;

import { RootState } from 'modules/index';
import React, { lazy, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NewTrip from 'types/NewTrip';
import Trip from 'types/Trip';
import { clientBasedUserTypes } from 'utils/constants';

const UiDataField = lazy(() => import('ui/UiDataField'));
const UserDetails = lazy(() => import('ui/UserDetails'));
const TripPickUpAndDeliverWithDates = lazy(
  () => import('./TripPickUpAndDeliverWithDates'),
);
interface Props {
  trip: Trip | NewTrip;
  hideProfile?: boolean;
}
export default function TripDetails({ trip, hideProfile }: Props) {
  const user = useSelector((state: RootState) => state.account.user);

  const alternateUser = useMemo(() => {
    if (hideProfile) return;
    const tripDetail = trip as Trip;
    if (clientBasedUserTypes.includes(user?.userType!)) {
      return tripDetail.transporter;
    }
    return tripDetail.tripOwner;
  }, [trip, user]);

  return (
    <ComponentStyling>
      {alternateUser && (
        <UserDetails
          avatar={alternateUser.avatar}
          userName={`${alternateUser.firstName} ${alternateUser.lastName}`}
          avatarIsHalfCurved={clientBasedUserTypes.includes(
            alternateUser.userType,
          )}
        />
      )}
      <div className="detail-grid">
        <UiDataField title="Job Type" value={trip.jobType} />
        <UiDataField title="Type" value={trip.typeOfGoods} />
        <UiDataField title="Shipping Line" value={trip.shippingLine} />
        <UiDataField title="Size Of Shipment" value={trip.sizeOfContainer} />
        <UiDataField
          title="Weight"
          value={!!trip.weight ? trip.weight + ' Tonnes' : ''}
        />
        {/* TODO: add truck type */}
        <UiDataField title="Truck Type" value={'Nil'} />
      </div>
      <TripPickUpAndDeliverWithDates
        pickUpAddress={trip.pickUpAddress}
        pickUpDate={trip.pickUpDate}
        deliveryAddress={trip.deliveryAddress}
        deliveryDate={trip.deliveryDate}
      />
      <UiDataField
        title="Handling instructions"
        value={trip.instructions}
        variant="text-area"
      />
    </ComponentStyling>
  );
}

const ComponentStyling = styled.div`
  display: grid;
  gap: 40px;

  .user-profile {
    display: flex;
    align-items: center;
    gap: 24px;

    &__content {
      display: flex;
      align-items: center;
      gap: 8px;

      .user-name {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-gray-80);
      }

      .user-type {
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 140%;

        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-gray-80);
      }
    }
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .bid-button-container {
    width: 100%;
    margin-top: 60px;

    button {
      margin: auto;
      width: 50%;
    }
  }
`;

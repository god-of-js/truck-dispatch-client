import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectTrip } from 'modules/Trips';
import styled from 'styled-components';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiBackButton from 'ui/UiBackButton';
import sizes from 'utils/sizes';
import UiCard from 'ui/UiCard';
import UiDataField from 'ui/UiDataField';
import TripPickUpAndDeliverWithDates from 'components/trips/TripPickUpAndDeliverWithDates';
import { RootState } from 'modules/index';
import { clientBasedUserTypes } from 'utils/constants';
import TripDetailPaymentCard from 'components/trips/TripDetailPaymentCard';
import UserDetails from 'ui/UserDetails';

export default function TripDetailsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const { tripId } = useParams();
  const trip = useSelector(selectTrip(tripId!));
  console.log(trip);

  const userIsClientBasedUser = useMemo(
    () => clientBasedUserTypes.includes(user?.userType!),
    [user],
  );

  return (
    <>
      <DashboardTopNav routeName="Trip Details" startChild={<UiBackButton />} />
      {/* Add not found here. */}
      {trip && (
        <TripDetailsStyling>
          <UiCard>
            <div className="card-title">Cargo Details</div>
            <div className="cargo-details">
              <UiDataField title="Type" value={trip?.typeOfGoods} />
              <UiDataField title="Weight" value={trip?.weight + ' Tonnes'} />
              <UiDataField
                title="Shipping Line"
                value={trip?.shippingLine || 'N/A'}
              />
            </div>
          </UiCard>
          <UiCard>
            <div className="card-title">Handling Instructions</div>
            <p className="handling-instructions">
              {trip?.instructions || 'N/A'}
            </p>
          </UiCard>
          <UiCard>
            <div className="card-title">Pickup Address & Date</div>
            {trip && (
              <TripPickUpAndDeliverWithDates
                pickUpAddress={trip.pickUpAddress}
                pickUpDate={trip.pickUpDate}
                deliveryAddress={trip.deliveryAddress}
                deliveryDate={trip.deliveryDate}
              />
            )}
          </UiCard>
          <TripDetailPaymentCard
            isClient={userIsClientBasedUser}
            payment={trip?.paymentRequest}
          />
          <UiCard>
            <div className="card-title">Driver & Vehicle details</div>

            <div className="driver-and-vehicle-details">
              <div className="driver-and-vehicle-details__field">
                <div className="driver-and-vehicle-details__field__title">
                  Responsible Driver
                </div>
                {/* <UserDetails avatar={trip.} /> */}
              </div>
            </div>
          </UiCard>
          <UiCard>
            <div className="card-title">Responsible Shipper</div>

            {!userIsClientBasedUser && (
              <UserDetails
                userName={`${trip.tripOwner.firstName} ${trip.tripOwner.lastName}`}
                avatar={trip.tripOwner.avatar}
                avatarIsHalfCurved
                phoneOrEmail={trip.tripOwner.phone}
              />
            )}
          </UiCard>
          <div></div>
        </TripDetailsStyling>
      )}
    </>
  );
}

const TripDetailsStyling = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  .card-title {
    font-style: normal;
    font-weight: 600;
    font-size: ${pxToRem(14)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    margin-bottom: ${pxToRem(24)};
  }

  .cargo-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${pxToRem(12)};
  }
  .handling-instructions {
    font-style: normal;
    font-weight: 400;
    font-size: ${pxToRem(16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-gray-80);
  }
  .no-payment-made {
    font-style: normal;
    font-weight: 400;
    font-size: ${pxToRem(16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-gray-60);
  }
  .driver-and-vehicle-details {
    &__field {
      &__title {
        font-style: normal;
        font-weight: 400;
        font-size: ${pxToRem(12)};
        line-height: 140%;
        letter-spacing: 0.05em;
        color: var(--color-gray-70);
        text-transform: uppercase;
      }
    }
  }

  @media screen and (min-width: ${sizes.mobileLargeWidth}) {
    grid-template-columns: 2fr 1fr;
    gap: ${pxToRem(20)};
  }
`;

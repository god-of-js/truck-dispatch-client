import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import UiPill from 'ui/UiPill';

export default function TripDetailsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const { tripId } = useParams();
  const trip = useSelector(selectTrip(tripId!));

  const userIsClientBasedUser = useMemo(
    () => clientBasedUserTypes.includes(user?.userType!),
    [user],
  );

  const statusText = useMemo(() => {
    if (trip?.status === 'assigned') return 'Assigned';
    if (trip?.status === 'awaiting-bid') return 'Awaiting Bid';
    if (trip?.status === 'in-progress') return 'Ongoing';
    if (trip?.status === 'completed') return 'Completed';
    return trip?.status;
  }, [trip]);

  const statusVariant = useMemo(() => {
    if (trip?.status === 'awaiting-bid') return 'orange';
    if (trip?.status === 'assigned') return 'rose';
    if (trip?.status === 'in-progress') return 'info';
    if (trip?.status === 'completed') return 'success';

    return 'success';
  }, [trip]);

  const TripStatusIndicator = useMemo(() => {
    return (
      <StatusIndicator>
        <span className="trip-status-text">Trip Status:</span>
        <div className="pill-container">
          <UiPill variant={statusVariant}>{statusText}</UiPill>
        </div>
      </StatusIndicator>
    );
  }, [trip]);

  return (
    <>
      <DashboardTopNav
        routeName="Trip Details"
        startNode={<UiBackButton />}
        edgeNode={TripStatusIndicator}
      />
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
                <UserDetails
                  userName={`${trip.tripOwner.firstName} ${trip.tripOwner.lastName}`}
                  avatar={trip.tripOwner.avatar}
                  profileSubtitle={
                    trip.status !== 'completed' ? trip.tripOwner.phone : ''
                  }
                />
              </div>
              <UiButton variant="icon-neutral">
                <UiIcon icon="ArrowRight" />
              </UiButton>
              <div className="driver-and-vehicle-details__field">
                <div className="driver-and-vehicle-details__field__title">
                  Vehicle Details
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
                profileSubtitle={
                  trip.status !== 'completed' ? trip.tripOwner.phone : ''
                }
              />
            )}
          </UiCard>
          <div className="double-grid">
            <UiCard>
              <div className="card-title">Transfer Delivery Order</div>
              <p className="description-text">
                This is a document that authorizes the release of cargo from a
                shipping terminal or port to the authorized transporter for
                final delivery.
              </p>
              <div className="double-items">
                {userIsClientBasedUser && !trip.TDO && (
                  <UiButton isFullWidth> Upload TDO</UiButton>
                )}
                {!userIsClientBasedUser && !!trip.TDO && (
                  <UiButton isFullWidth> Download TDO</UiButton>
                )}
              </div>
            </UiCard>
            {userIsClientBasedUser && trip.status === 'awaiting-bid' && (
              <UiCard>
                <div className="card-title">Bids</div>
                <p className="description-text">
                  Bids are requests transporters send to enable them assist you
                  in your trip. Accept a bid to officially begin your trip.
                </p>
                <div className="bottom">
                  <div className="double-items">
                    <Link to={`/my-trips/${trip._id}/bids`}>
                      <UiButton isFullWidth>
                        View bids sent for this trip
                      </UiButton>
                    </Link>
                  </div>
                </div>
              </UiCard>
            )}
          </div>
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
  .description-text {
    font-style: normal;
    font-weight: 400;
    font-size: ${pxToRem(16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-gray-60);
  }
  .driver-and-vehicle-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__field {
      &__title {
        font-style: normal;
        font-weight: 400;
        font-size: ${pxToRem(12)};
        line-height: 140%;
        letter-spacing: 0.05em;
        color: var(--color-gray-70);
        text-transform: uppercase;
        margin-bottom: ${pxToRem(12)};
      }
    }
  }
  .double-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: ${pxToRem(20)};
  }
  @media screen and (min-width: ${sizes.mobileLargeWidth}) {
    grid-template-columns: 2fr 1fr;
    gap: ${pxToRem(20)};

    .double-grid {
      grid-template-columns: repeat(2, 2fr);
    }
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  align-items: center;
  .trip-status-text {
    font-weight: 600;
    font-size: ${pxToRem(14)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }
  .pill-container {
    background: #fff;
    border-radius: ${pxToRem(20)};
    padding: ${pxToRem(4)};

    .ui-pill {
      border-radius: ${pxToRem(16)};
      padding: ${pxToRem(8)};
      height: ${pxToRem(20)};
    }
  }
`;

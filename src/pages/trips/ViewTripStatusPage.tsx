import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';
import {
  selectAgents,
  selectDashboardUser,
  selectTransporters,
} from 'modules/Account';
import {
  createOrUpdateTrip,
  getAgentTrips,
  getTransporterTrips,
  selectTrip,
} from 'modules/Trips';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

export default function ViewTripStatus() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const trip = useSelector(selectTrip(tripId || ''));
  const transporters = useSelector(selectTransporters);
  const agents = useSelector(selectAgents);
  const user = useSelector(selectDashboardUser);
  const [loading, setLoading] = useState(false);

  const transporter = useMemo(() => {
    return transporters.find(({ id }) => id === trip?.transporterId) || null;
  }, [transporters]);
  const agent = useMemo(() => {
    return agents.find(({ id }) => id === trip?.agentId) || null;
  }, [transporters]);

  const tripStatusMessage = useMemo(() => {
    let heading: string = 'Accept a bid to commence trip',
      textContent: string =
        'Kindly accept a bid from a trusted transporter on the platform. We assure you that our transporters undergo a rigorous verification process and we also curate feedback from transporters previous trips to inform you of the transporters efficiency.';

    if (trip?.status === 'payment_complete') {
      heading = "Sit back; we've got this";
      textContent =
        'Your transporter has been notified and would be on his way to your cargo shortly. You can find your transporters contact details below. \n PS: Payment to transporter would be tendered after dispatch is marked as completed; This is an extra security measure to curb fraudulent activities.';
    }
    if (trip?.status === 'in-progress') {
      heading = "Your cargo is on it's way";
      textContent =
        'The transporter is on the way with your cargo;  PS: Payment to transporter would be tendered after dispatch is marked as completed; This is an extra security measure to curb fraudulent activities. Thank you for trusting us with your dispatch.';
    }
    if (trip?.status === 'completed') {
      heading = 'Thank you for trusting us with your dispatch';
      textContent =
        'Your cargo has been delivered; Thank you for dispatching with us. We are commited to providing you with more secure and improved ways to dispatch your goods. To earn discounts on your next trip, kindly drop a review of the transporter to enable other agents dispatch safely.';
    }

    return (
      <section className="trip-status-message">
        <h3>{heading}</h3>
        <p>{textContent}</p>
      </section>
    );
  }, [trip]);

  const phoneNumberOfResponsibleUser = useMemo(() => {
    return user?.userType === 'agent' ? transporter?.phone : agent?.phone;
  }, [user, transporter, agent]);
  function updateTrip(data: Partial<Trip>) {
    if (!trip || !user) return;
    setLoading(true);
    dispatch(toAnyAction(createOrUpdateTrip({ ...trip, ...data })))
      .then(() => {
        const actionToDispatch =
          user.userType === 'agent'
            ? getAgentTrips(user.id)
            : getTransporterTrips(user.id);
        dispatch(toAnyAction(actionToDispatch));
      })
      .finally(() => setLoading(false));
  }

  function startTrip() {
    updateTrip({ status: 'in-progress' });
  }

  function completeTrip() {
    updateTrip({ status: 'completed' });
  }

  return (
    <PageStyling>
      <CardContainer>
        <TripPickupAndDropOff
          pickup={trip?.pickUpAddress || ''}
          dropOff={trip?.deliveryAddress || ''}
          status={trip?.status}
        />
        <p>{tripStatusMessage}</p>

        <div className="responsible-user-details">
          {/* TODO: input user avatar when avatars are ready */}
          <UiAvatar />
          <div>
            <div className="title">
              {user?.userType === 'agent'
                ? 'Assigned Transporter'
                : 'Responsible Agent'}
            </div>
            <div className="name">
              {user?.userType === 'agent'
                ? transporter
                  ? `${transporter?.firstName} ${transporter?.lastName}`
                  : 'Not Yet Assigned'
                : agent?.firstName + ' ' + agent?.lastName}
            </div>
            {phoneNumberOfResponsibleUser && (
              <a href={`tel:${phoneNumberOfResponsibleUser}`} className="phone">
                {phoneNumberOfResponsibleUser}
              </a>
            )}
          </div>
        </div>
      </CardContainer>
      {user?.userType === 'transporter' && (
        <CardContainer isSmall>
          {trip?.status === 'payment_complete' && (
            <>
              <h3>Start Trip</h3>
              <p>
                Payment has been made and all documents have been sent hence the
                trip is ready to go. To begin this trip, clicck the button below
                to notify the Agent the trip is about to start.
              </p>
              <UiButton loading={loading} onClick={startTrip}>
                Start Trip
              </UiButton>
            </>
          )}
          {trip?.status === 'in-progress' && (
            <>
              <h3>Complete Trip</h3>
              <p>
                Have you gotten to the location? If so, kindly click the button
                below to inform the agent that you have completed the trip.
                <br />
                You would be paid in full after clicking the button and we
                verify that the agents have gotten their goods.
              </p>
              <UiButton loading={loading} onClick={completeTrip}>
                Complete Trip
              </UiButton>
            </>
          )}
          {trip?.status === 'completed' && (
            <>
              <h3>Congratulations the Trip has been completed 🔥👍 </h3>
              <p>
                Thanks a lot for helping us with this dispatch; <br /> Your
                payment would be completed immediately the agent certifies that
                he has received his goods or if the agent does not respond
                within 3 days.
              </p>
            </>
          )}
        </CardContainer>
      )}
    </PageStyling>
  );
}

const PageStyling = styled.div`
  display: flex;
  gap: ${pxToRem(16)};
  justify-content: center;
  flex-direction: column-reverse;

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    flex-direction: row;
  }
`;
const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin-top: ${pxToRem(24)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  h3 {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-500);
  }
  p {
    color: var(--color-gray-600);
    font-size: ${pxToRem(14)};
  }

  .responsible-user-details {
    display: flex;
    align-items: flex-end;
    gap: ${pxToRem(8)};
    .title {
      font-size: ${pxToRem(14)};
      color: var(--color-gray-400);
      margin-bottom: ${pxToRem(4)};
    }
    .name {
      font-size: ${pxToRem(16)};
      font-weight: bold;
      color: var(--color-gray-600);
      margin-bottom: ${pxToRem(4)};
    }
    .phone {
      font-size: ${pxToRem(12)};
    }
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: ${({ isSmall }: { isSmall?: boolean }) => (isSmall ? '30%' : '50%')};
  }
`;

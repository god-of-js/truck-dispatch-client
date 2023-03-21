import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import sizes from 'utils/sizes';

import { selectTrip } from 'modules/Trips';
import ViewTripDetails from 'components/trips/ViewTripDetails';
import NotFoundError from 'components/errors/NotFoundError';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';

export default function ViewTripDetailsPage() {
  const { tripId } = useParams();
  const trip = tripId ? useSelector(selectTrip(tripId)) : null;

  return (
    <>
      {(trip && (
        <>
          <CardContainer>
            <TripPickupAndDropOff
              pickup={trip?.pickUpAddress || ''}
              dropOff={trip?.deliveryAddress || ''}
            />
          </CardContainer>
          <CardContainer>
            <ViewTripDetails data={trip} notConfirm hideActionButtons />
          </CardContainer>
        </>
      )) || <NotFoundError />}
    </>
  );
}

const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  margin-top: ${pxToRem(24)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;

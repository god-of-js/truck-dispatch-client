import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import Trip from 'types/Trip';

import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import UiTable from 'ui/UiTable';
import UiPill from 'ui/UiPill';
import sizes from 'utils/sizes';
import User from 'types/User';
import { filterByFieldInObject } from 'utils/helpers';

interface Props {
  status: string | null;
}
export default function ShipperTripPageContent({ status }: Props) {
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);

  const headers = [
    {
      title: 'Trip Owner',
      query: 'tripOwner',
    },
    {
      title: 'Type Of Goods',
      query: 'typeOfGoods',
    },
    {
      title: 'Pick Up Address',
      query: 'pickUpAddress',
    },
    {
      title: 'Delivery Address',
      query: 'deliveryAddress',
    },
    {
      title: 'Pickup Date',
      query: 'pickUpDate',
    },
    {
      title: 'Delivery Date',
      query: 'deliveryDate',
    },
    {
      title: 'status',
      query: 'status',
    },
  ];

  function tripOwnerDetails(tripOwner?: User) {
    if (!tripOwner) return 'This user does not exist';

    return (
      <ShipperDetails>
        <UiAvatar avatar={tripOwner.avatar} />
        <div>
          <div>{`${tripOwner.firstName} ${tripOwner.lastName}`}</div>
          <div className="trip-owner-phone">{tripOwner.phone}</div>
        </div>
      </ShipperDetails>
    );
  }
  function getPillVariant(status: Trip['status']) {
    if (status === 'awaiting-bid') return 'gray';
    if (status === 'payment-complete') return 'warning';
    if (status === 'in-progress') return 'info';
    if (status === 'completed') return 'success';

    return 'success';
  }
  function formatStatus(status: Trip['status']) {
    if (status === 'awaiting-bid') return 'Awaiting Bid';
    if (status === 'payment-complete') return ' Pending';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'completed') return 'Completed';
  }

  const tripsData = useMemo(() => {
    const data = status
      ? filterByFieldInObject<Trip>('status', status, trips)
      : trips;

    return data.map((trip: Trip) => ({
      ...trip,
      tripOwner: tripOwnerDetails(trip?.tripOwner),
      status: (
        <UiPill variant={getPillVariant(trip.status)}>
          {formatStatus(trip.status)}
        </UiPill>
      ),
    }));
  }, [trips]);
  function navigateToTrip(id: string) {
    navigate(`/my-trips/${id}`);
  }

  const noTripsYet = (
    <NoTripsYet>
      <UiIcon icon="NoData" size="160" />
      <p>
        You have not been assigned any trips yet. Kindly head over to the{' '}
        <Link to="/available-jobs">Jobs</Link> page to bid for mouthwatering
        trips.
      </p>
      <Link to="/available-jobs">
        <UiButton variant="primary">Bid for jobs</UiButton>
      </Link>
    </NoTripsYet>
  );
  return (
    <>
      <UiTable
        data={tripsData}
        headers={headers}
        tableTitle="My Trips"
        onRowClick={navigateToTrip}
        noDataPlaceHolder={noTripsYet}
      />
    </>
  );
}

const ShipperDetails = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  align-items: center;
  .trip-owner-phone {
    font-weight: 400;
    font-size: ${pxToRem(14)};
  }
`;

const NoTripsYet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    width: 80%;
    font-size: ${pxToRem(18)};
    color: var(--color-gray-80);
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      width: 60%;
    }
  }
`;

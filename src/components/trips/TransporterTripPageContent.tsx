import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectAgents } from 'modules/Account';
import { RootState } from 'modules/index';
import Trip from 'types/Trip';
import UiAvatar from 'ui/UiAvatar';

import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import UiTable from 'ui/UiTable';
import UiPill from 'ui/UiPill';
import sizes from 'utils/sizes';
import User from 'types/User';

export default function AgentTripPageContent() {
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);
  const agents = useSelector(selectAgents);

  const headers = [
    {
      title: 'Agent',
      query: 'agent',
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
  ];

  function tripOwnerDetails(tripOwner?: User) {
    if (!tripOwner) return 'This agent does not exist';

    return (
      <AgentDetails>
        <UiAvatar avatar={tripOwner.avatar} />
        <div>
          <div>{`${tripOwner.firstName} ${tripOwner.lastName}`}</div>
          <div className="transporter-phone">{tripOwner.phone}</div>
        </div>
      </AgentDetails>
    );
  }
  function getPillVariant(status: string) {
    if (status === 'pending') return 'warning';
    if (status === 'rejected') return 'danger';
    if (status === 'awaiting_bid') return 'gray';
    if (status === 'In Progress') return 'info';
    if (status === 'completed') return 'success';

    return 'success';
  }
  function formatStatus(status: string) {
    if (status === 'pending') return '  Pending';
    if (status === 'rejected') return ' Rejected';
    if (status === 'awaiting_bid') return 'Awaiting Bid';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'completed') return 'Completed';
  }

  const tripsData = useMemo(() => {
    return trips.map((trip: Trip) => ({
      ...trip,
      agent: tripOwnerDetails(trip?.tripOwner),
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
      <UiIcon icon="FolderNotchOpen" size="70" />
      <p>
        You have not been assigned any trips yet. Kindly head over to the{' '}
        <Link to="/available-jobs">Jobs</Link> page to bid for mouthwatering
        trips.
      </p>
      <Link to="/available-jobs">
        <UiButton variant="neutral">Bid for jobs</UiButton>
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

const AgentDetails = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  align-items: center;
  .transporter-phone {
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
    font-size: ${pxToRem(14)};
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      width: 60%;
    }
  }
`;

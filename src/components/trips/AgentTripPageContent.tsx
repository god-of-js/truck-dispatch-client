import { RootState } from 'modules/index';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Trip from 'types/Trip';

import UiButton from 'ui/UiButton';
import UiTable from 'ui/UiTable';

export default function AgentTripPageContent() {
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);

  const headers = [
    {
      title: 'Responsible Transporter',
      query: 'responsibleTransporter',
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

  function responsibleTransporterDetails(transporterId?: string) {
    if (!transporterId) return 'Not yet assigned';
  }

  const tripsData = useMemo(() => {
    return trips.map((trip: Trip) => ({
      ...trip,
      responsibleTransporter: responsibleTransporterDetails(
        trip.responsibleTransporterId,
      ),
    }));
  }, [trips]);

  function navigateToTrip(id: string) {
    navigate(`/my-trips/${id}`);
  }

  return (
    <>
      <CreateTripButtonContainer>
        <Link to="/my-trips/new">
          <UiButton size="md">Create New Trip</UiButton>
        </Link>
      </CreateTripButtonContainer>
      <UiTable
        data={tripsData}
        headers={headers}
        options={[]}
        tableTitle="My Trips"
        onRowClick={navigateToTrip}
      />
    </>
  );
}

const CreateTripButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${pxToRem(8)};
`;

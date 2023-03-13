import { selectTransporters } from 'modules/Account';
import { RootState } from 'modules/index';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiAvatar from 'ui/UiAvatar';

import UiButton from 'ui/UiButton';
import UiTable from 'ui/UiTable';
import UiIcon from 'ui/UiIcon';
import { DropDownData }  from 'ui/UiDropdownMenu';

export default function AgentTripPageContent() {
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);
  console.log(trips)
  const transporters = useSelector(selectTransporters);

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

const dropDownData: DropDownData[] = trips.flatMap((trip)=> {
  return[
    {
      label: 'View Trip',
      path: `${trip.id}`
    },
    {
      label: 'Edit Trip',
      path: `/dashboard/my-trips/${trip.id}/edit`
    },
] 
})

  function responsibleTransporterDetails(transporterId?: string) {
    if (!transporterId) return 'Not yet assigned';
    const transporter = transporters.find(({ id }) => id === transporterId);

    if (!transporter) return 'Invalid Transporter';

    return (
      <TransporterDetails>
        <UiAvatar />
        <div>
          <div>{`${transporter.firstName} ${transporter.lastName}`}</div>
          <div className="transporter-phone">{transporter.phone}</div>
        </div>
      </TransporterDetails>
    );
  }

  const tripsData = useMemo(() => {
    return trips.map((trip: Trip) => ({
      ...trip,
      responsibleTransporter: responsibleTransporterDetails(trip.transporterId),
    }));
  }, [trips]);
  console.log(tripsData);
  

  function navigateToTrip(id: string) {
    navigate(`/dashboard/my-trips/${id}`);
  }

  return (
    <>
      <CreateTripButtonContainer>
        <Link to="/dashboard/my-trips/new">
          <UiButton size="md">Create New Trip</UiButton>
        </Link>
      </CreateTripButtonContainer>
      <UiTable
        data={tripsData}
        headers={headers}
        tableTitle="My Trips"
        onRowClick={navigateToTrip}
        options={dropDownData}
      />
    </>
  );
}

const CreateTripButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${pxToRem(8)};
`;

const TransporterDetails = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  align-items: center;
  .transporter-phone {
    font-weight: 400;
    font-size: ${pxToRem(14)};
  }
`;

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
import UiPill from 'ui/UiPill';
import { DropDownData } from 'ui/UiDropdownMenu';

export default function AgentTripPageContent() {
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);
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
    {
      title: 'Trip Status',
      query: 'status',
    },
  ];

  const dropDownData: DropDownData[] = [
    {
      label: 'View Trip',
      func: navigateToTrip,
    },
    {
      label: 'Edit Trip',
      func: editTrip,
    },
  ];

  function responsibleTransporterDetails(transporterId?: string) {
    if (!transporterId) return 'Not yet assigned';
    const transporter = transporters.find(({ _id }) => _id === transporterId);

    if (!transporter) return 'Invalid Transporter';

    return (
      <TransporterDetails>
        <UiAvatar avatar={transporter.avatar} />
        <div>
          <div>{`${transporter.firstName} ${transporter.lastName}`}</div>
          <div className="transporter-phone">{transporter.phone}</div>
        </div>
      </TransporterDetails>
    );
  }

  function getPillVariant(status: Trip['status']) {
    if (status === 'payment_complete') return 'warning';
    if (status === 'awaiting_bid') return 'gray';
    if (status === 'in-progress') return 'info';
    if (status === 'completed') return 'success';

    return 'success';
  }
  function formatStatus(status: Trip['status']) {
    if (status === 'payment_complete') return 'Pending';
    if (status === 'awaiting_bid') return 'Awaiting Bid';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'completed') return 'Completed';
  }

  const tripsData = useMemo(() => {
    return trips.map((trip: Trip) => ({
      ...trip,
      id: trip._id,
      responsibleTransporter: responsibleTransporterDetails(trip.transporterId),
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

  function editTrip(id: string) {
    navigate(`/my-trips/${id}/edit`);
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
        tableTitle="My Trips"
        onRowClick={navigateToTrip}
        options={dropDownData}
        noDataParagraphText="You have no trips. Create new trip by clicking the button above."
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

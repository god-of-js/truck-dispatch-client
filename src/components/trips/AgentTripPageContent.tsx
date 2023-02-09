import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import { getAgentTrips } from 'modules/Trips';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Trip from 'types/Trip';

import UiButton from 'ui/UiButton';
import UiTable from 'ui/UiTable';
import { toAnyAction } from 'utils/helpers';

export default function AgentTripPageContent() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
  const trips = useSelector((state: RootState) => state.trips.trips);
  const [loading, setLoading] = useState(true);

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
    if (!transporterId) return 'Not yet assigned'
  }

  const tripsData = useMemo(() => {
    return trips.map((trip: Trip) => ({
    ...trip,
    responsibleTransporter: responsibleTransporterDetails(trip.responsibleTransporterId)
  }))}, [trips]);

  useEffect(() => {
    if (user?.id) {
      dispatch(toAnyAction(getAgentTrips(user?.id))).finally(() => {
        setLoading(false);
      });
    }
  });

  return (
    <>
      <CreateTripButtonContainer>
        <Link to="/my-trips/new">
          <UiButton size="md">Create New Trip</UiButton>
        </Link>
      </CreateTripButtonContainer>
      {loading ? <Loader /> : <UiTable data={tripsData} headers={headers} options={[]} tableTitle="My Trips" />}
    </>
  );
}

const CreateTripButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${pxToRem(8)}
`;

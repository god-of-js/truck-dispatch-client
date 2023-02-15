import { selectAgents, selectTransporters } from 'modules/Account';
import { RootState } from 'modules/index';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiAvatar from 'ui/UiAvatar';

import UiButton from 'ui/UiButton';
import UiTable from 'ui/UiTable';

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

  function agentDetails(agentId?: string) {
    if (!agentId) return 'No agent present';
    const agent = agents.find(({ id }) => id === agentId);

    if (!agent) return 'This Agent does not exist';

    return (
      <AgentDetails>
        <UiAvatar />
        <div>
          <div>{`${agent.firstName} ${agent.lastName}`}</div>
          <div className="transporter-phone">{agent.phone}</div>
        </div>
      </AgentDetails>
    );
  }

  const tripsData = useMemo(() => {
    return trips.map((trip: Trip) => ({
      ...trip,
      agent: agentDetails(trip.agentId),
    }));
  }, [trips]);

  function navigateToTrip(id: string) {
    navigate(`/my-trips/${id}`);
  }

  return (
    <>
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

const AgentDetails = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  align-items: center;
  .transporter-phone {
    font-weight: 400;
    font-size: ${pxToRem(14)};
  }
`;

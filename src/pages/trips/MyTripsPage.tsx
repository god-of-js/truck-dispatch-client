import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import AgentTripPageContent from 'components/trips/AgentTripPageContent';
import TransporterTripPageContent from 'components/trips/TransporterTripPageContent';
import { selectDashboardUser } from 'modules/Account';

export default function MyTripsPage() {
  const user = useSelector(selectDashboardUser);

  return (
    <MyTripsPageStyle>
      {/* TODO: put a message for transporter to verify if not yet verified */}
      {user?.userType === 'agent' ? (
        <AgentTripPageContent />
      ) : (
        <TransporterTripPageContent />
      )}
    </MyTripsPageStyle>
  );
}

const MyTripsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

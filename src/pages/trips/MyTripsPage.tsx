import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from 'modules/index';
import AgentTripPageContent from 'components/trips/AgentTripPageContent';
import TransporterTripPageContent from 'components/trips/TransporterTripPageContent';

export default function MyTripsPage() {
  const user = useSelector((state: RootState) => state.account.user);

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

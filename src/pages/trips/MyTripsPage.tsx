import React, { useState } from 'react';
import styled from 'styled-components';

import AgentTripPageContent from 'components/trips/AgentTripPageContent';

export default function MyTripsPage() {
  return (
    <MyTripsPageStyle>
      <AgentTripPageContent />
    </MyTripsPageStyle>
  );
}

const MyTripsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

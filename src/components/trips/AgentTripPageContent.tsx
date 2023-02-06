import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import UiButton from 'ui/UiButton';

export default function AgentTripPageContent() {
  return (
    <>
      <CreateTripButtonContainer>
        <Link to="/my-trips/new">
          <UiButton notFullWidth size="md">
            Create Trip
          </UiButton>
        </Link>
      </CreateTripButtonContainer>
    </>
  );
}

const CreateTripButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

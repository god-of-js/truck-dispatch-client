import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import ShipperTripPageContent from 'components/trips/ShipperTripPageContent';
import TransporterTripPageContent from 'components/trips/TransporterTripPageContent';
import { clientBasedUserTypes } from 'utils/constants';

export default function MyTripsPage() {
  const user = useSelector((state: RootState) => state.account.user);

  return (
    <>
      <MyTripsPageStyle>
        {clientBasedUserTypes.includes(user?.userType!) ? (
          <ShipperTripPageContent />
        ) : (
          <TransporterTripPageContent />
        )}
      </MyTripsPageStyle>
    </>
  );
}

const MyTripsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Logo from '../../assets/img/truck-dispatch-logo-with-text.png';

import { RootState } from 'modules/index';
import AgentTripPageContent from 'components/trips/AgentTripPageContent';
import TransporterTripPageContent from 'components/trips/TransporterTripPageContent';

export default function MyTripsPage() {
  const user = useSelector((state: RootState) => state.account.user);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Trips- TruckDispatch</title>
        <meta property="og:image" content={Logo} />
      </Helmet>
      <MyTripsPageStyle>
        {user?.userType === 'agent' ? (
          <AgentTripPageContent />
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

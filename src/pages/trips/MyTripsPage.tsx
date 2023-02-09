import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AgentTripPageContent from 'components/trips/AgentTripPageContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import TransporterTripPageContent from 'components/trips/TransporterTripPageContent';
import { toAnyAction } from 'utils/helpers';
import { getAgentTrips, getTransporterTrips } from 'modules/Trips';
import Loader from 'components/layout/Loader';

export default function MyTripsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.userType === 'agent') {
        dispatch(toAnyAction(getAgentTrips(user.id))).finally(() => {
          setLoading(false);
        });
      } else if (user?.status === 'unverified') {
        dispatch(toAnyAction(getTransporterTrips(user.id))).finally(() => {
          setLoading(false);
        });
      }
    }
  });

  return (
    <MyTripsPageStyle>
      {/* TODO: put a message for transporter to verify if not yet verified */}
      {!loading ? (
        user?.userType === 'agent' ? (
          <AgentTripPageContent />
        ) : (
          <TransporterTripPageContent />
        )
      ) : (
        <Loader />
      )}
    </MyTripsPageStyle>
  );
}

const MyTripsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

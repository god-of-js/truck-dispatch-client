import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getBidsWithTripId } from 'modules/Trips';
import { toAnyAction } from 'utils/helpers';

import Loader from 'components/layout/Loader';
import UiTable from 'ui/UiTable';
import { RootState } from 'modules/index';

export default function ViewTripBidsPage() {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const bids = useSelector((state: RootState) => state.trips.bids)
  const [loading, setLoading] = useState(true);
  const headers = [
      {
        title: 'Transporter',
        query: 'presentLocation' 
      },
      {
        title: 'Transporter Ratings',
        query: 'presentLocation' 
      },
      {
        title: 'Truck Present Location',
        query: 'presentLocation' 
      },
  ]
  useEffect(() => {
    //   TODO: show user no trip id was found.
    if (!tripId) throw new Error('400: Trip was not provided');
    dispatch(toAnyAction(getBidsWithTripId(tripId))).finally(() =>
      setLoading(false),
    );
  });

  return (
    <PageStyling>
      {loading ? (
        <Loader />
      ) : (
        <UiTable
          data={bids}
          headers={headers}
          tableTitle="Bids by transporters"
          options={[]}
        />
      )}
    </PageStyling>
  );
}

const PageStyling = styled.div`
  padding: 0 ${pxToRem(20)};
`;

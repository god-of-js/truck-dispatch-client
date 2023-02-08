import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import { getTransporterJobs } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UiTable from 'ui/UiTable';
import { toAnyAction } from 'utils/helpers';

export default function TransporterJobs() {
  const transporterJobs = useSelector(
    (state: RootState) => state.trips.transporterJobs,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headers = [
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
  const [loading, setLoading] = useState(true);

  function viewJob(jobId: string) {
    navigate(`available-jobs/${jobId}`);
  }
  useEffect(() => {
    dispatch(toAnyAction(getTransporterJobs())).finally(() => {
      setLoading(false);
    });
  });

  return (
    <MyJobsPageStyle>
      {!loading ? (
        <UiTable
          tableTitle="Available Jobs"
          data={transporterJobs}
          headers={headers}
          options={[]}
          onRowClick={viewJob}
        />
      ) : (
        <Loader />
      )}
    </MyJobsPageStyle>
  );
}

const MyJobsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

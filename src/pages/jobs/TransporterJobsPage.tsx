import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import { getJobs } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UiTable from 'ui/UiTable';
import { toAnyAction } from 'utils/helpers';

import { Helmet } from 'react-helmet';
import Logo from '../../assets/img/truck-dispatch-logo-with-text.png';

export default function TransporterJobs() {
  const jobs = useSelector((state: RootState) => state.trips.jobs);
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
    navigate(`${jobId}`);
  }
  useEffect(() => {
    dispatch(toAnyAction(getJobs())).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Jobs - TruckDispatch</title>
        <meta property="og:image" content={Logo} />
      </Helmet>
      <MyJobsPageStyle>
        {!loading ? (
          <UiTable
            tableTitle="Available Jobs"
            data={jobs}
            headers={headers}
            onRowClick={viewJob}
          />
        ) : (
          <Loader />
        )}
      </MyJobsPageStyle>
    </>
  );
}

const MyJobsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

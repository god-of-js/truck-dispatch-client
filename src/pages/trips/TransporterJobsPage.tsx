import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import { getTransporterJobs } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';

export default function TransporterJobs() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(toAnyAction(getTransporterJobs())).finally(() => {
      setLoading(false);
    });
  });

  return (
    <MyJobsPageStyle>
      {/* TODO: put a message for transporter to verify if not yet verified */}
      {!loading ? <> </> : <Loader />}
    </MyJobsPageStyle>
  );
}

const MyJobsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

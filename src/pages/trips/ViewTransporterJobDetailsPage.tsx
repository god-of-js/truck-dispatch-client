import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';

import { getTransporterJobs, selectTransporterJob } from 'modules/Trips';
import { RootState } from 'modules/index';
import UiBackButton from 'ui/UiBackButton';
import Loader from 'components/layout/Loader';
import ViewTripDetails from 'components/trips/ViewTripDetails';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundError from 'components/errors/NotFoundError';
import sizes from 'utils/sizes';

export default function ViewTransporterJobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const transporterJob = jobId
    ? useSelector(selectTransporterJob(jobId))
    : null;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  function bidForJob() {}
  function goBack() {
    navigate(-1);
  }
  useEffect(() => {
    dispatch(toAnyAction(getTransporterJobs())).finally(() => {
      setLoading(false);
    });
  });
  return (
    <ViewTransporterJobPageStyle>
      <UiBackButton />
      {loading ? (
        <Loader />
      ) : (
        (transporterJob && (
          <CardContainer>
            <ViewTripDetails
              data={transporterJob}
              nextHandler={bidForJob}
              prevHandler={goBack}
              loading={loading}
              actionText="Bid For Job"
            />
          </CardContainer>
        )) || <NotFoundError />
      )}
    </ViewTransporterJobPageStyle>
  );
}

const ViewTransporterJobPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  margin-top: ${pxToRem(24)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;

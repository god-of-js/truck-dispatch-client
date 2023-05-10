import JobItem from 'components/jobs/JobItem';
import Loader from 'components/layout/Loader';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import { RootState } from 'modules/index';
import { getJobs } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UiOverlay from 'ui/UiOverlay';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

interface Props {
  isActionButtonDisabled?: boolean;
}

export default function TransporterJobs({ isActionButtonDisabled }: Props) {
  const { tripId } = useParams();
  const jobs = useSelector((state: RootState) => state.trips.jobs);
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);

  function viewJob(jobId: string) {
    navigate(`${jobId}`);
  }

  useEffect(() => {
    dispatch(toAnyAction(getJobs())).finally(() => {
      setLoading(false);
    });
  }, []);

  function bidForJob() {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      return;
    }
    navigate(`/available-jobs/${tripId}/bid`);
  }

  return (
    <>
      <MyJobsPageStyle className="flex-container">
        {!loading ? (
          <>
            {jobs.map((job) => {
              return (
                <JobItem
                  job={job}
                  bidForJob={bidForJob}
                  viewJobDetail={viewJob}
                />
              );
            })}
          </>
        ) : (
          <Loader />
        )}
      </MyJobsPageStyle>
      <UiOverlay isVisible={isInformUserOfVerificationModalVisible}>
        <InformUserOfVerification
          onClose={() => setIsInformUserOfVerificationModalVisible(false)}
        />
      </UiOverlay>
    </>
  );
}

const MyJobsPageStyle = styled.div`
  margin: ${pxToRem(32)} 0;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(20)};

  @media only screen and (min-width: ${sizes.laptopWidth}) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .underline {
    border-bottom: ${pxToRem(1)} solid #848288;
    padding-bottom: ${pxToRem(24)};
  }

  .capitalize {
    text-transform: uppercase;
    font-weight: 400;
    font-size: ${pxToRem(10)};
    line-height: 1.5;
    letter-spacing: 0.05em;
  }
`;

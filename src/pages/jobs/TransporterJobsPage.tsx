import JobItem from 'components/jobs/JobItem';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import Loader from 'components/layout/Loader';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import { RootState } from 'modules/index';
import { getJobs } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UiOverlay from 'ui/UiOverlay';
import { toAnyAction } from 'utils/helpers';

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

  const pageFilters = [
    {
      title: 'All',
      route: '/available-jobs',
    },
    {
      title: 'By Companies',
      route: '/available-jobs?sender-type=company',
    },
    {
      title: 'By Shippers',
      route: '/available-jobs?sender-type=shipper',
    },
  ];

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
      <DashboardTopNav routeName="Jobs" pageFilters={pageFilters} />
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
          <Loader size="lg" />
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
  flex-wrap: wrap;
  gap: ${pxToRem(20)};
`;

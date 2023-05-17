import React, { useEffect, useMemo, useState } from 'react';

import JobItem from 'components/jobs/JobItem';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import Loader from 'components/layout/Loader';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import { RootState } from 'modules/index';
import { getJobs } from 'modules/Trips';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UiOverlay from 'ui/UiOverlay';
import { filterByFieldInObject, toAnyAction } from 'utils/helpers';
import Trip from 'types/Trip';
import UiInput from 'ui/UiInput';
import UiIcon from 'ui/UiIcon';
export default function TransporterJobs() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const senderType = searchParams.get('sender-type');

  const { tripId } = useParams();
  const jobs = useSelector((state: RootState) => state.trips.jobs);
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredJobs = useMemo(() => {
    if (!senderType) return jobs;
    // TODO: implement pagination.
    return filterByFieldInObject<Trip>('tripOwner.userType', senderType, jobs);
  }, [jobs, senderType]);

  function viewJob(jobId: string) {
    navigate(`${jobId}`);
  }

  function bidForJob() {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      return;
    }
    navigate(`/available-jobs/${tripId}/bid`);
  }

  function handleChange( { value }: {
    name: string;
    value: string | null;
  }) {
    setSearchQuery(value!!);
  }

  useEffect(() => {
    dispatch(toAnyAction(getJobs())).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Jobs"
        pageFilters={pageFilters}
        edgeChild={
          <UiInput
            onChange={handleChange}
            value={searchQuery}
            name="searchQuery"
            placeholder="Search..."
            icon={<UiIcon icon='Search' size='20'/>}
          />
        }
      />
      <MyJobsPageStyle className="flex-container">
        {!loading ? (
          <>
            {filteredJobs.map((job) => {
              return (
                <JobItem
                  job={job}
                  key={job._id}
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

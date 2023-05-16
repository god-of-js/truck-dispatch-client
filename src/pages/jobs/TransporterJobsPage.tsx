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
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import { clientBasedUserTypes } from 'utils/constants';
import JobsResponse from 'types/JobsResponse';

export default function TransporterJobs() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const senderType = searchParams.get('sender-type');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allJobs, setAllJobs] = useState(0);
  const [allJobsByCompany, setAllJobsByCompany] = useState(0);
  const [allJobsByShipper, setAllJobsByShipper] = useState(0);

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

  const pageFilters = useMemo(
    () => [
      {
        title: 'All',
        route: '/available-jobs',
        value: allJobs,
      },
      {
        title: 'By Companies',
        route: '/available-jobs?sender-type=company',
        value: allJobsByCompany,
      },
      {
        title: 'By Shippers',
        route: '/available-jobs?sender-type=shipper',
        value: allJobsByShipper,
      },
    ],
    [allJobs, allJobsByCompany, allJobsByShipper],
  );

  const filteredJobs = useMemo(() => {
    if (!senderType) return jobs;
    return filterByFieldInObject<Trip>('tripOwnerUserType', senderType, jobs);
  }, [jobs, senderType]);

  function viewJob(jobId: string) {
    navigate(`${jobId}`);
  }

  function loadJobs() {
    setLoading(true);
    const data: { page: number; limit?: number; senderType?: string } = {
      page,
      limit: 20,
    };
    if (clientBasedUserTypes.includes(senderType!))
      data.senderType = senderType!;

    dispatch(toAnyAction(getJobs(data)))
      .then((response: JobsResponse) => {
        setTotalPages(response.totalPages);
        setAllJobs(response.totalItems);
        setAllJobsByCompany(response.byCompany);
        setAllJobsByShipper(response.byShipper);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function bidForJob() {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      return;
    }
    navigate(`/available-jobs/${tripId}/bid`);
  }

  useEffect(() => {
    loadJobs();
  }, [senderType, page]);

  useEffect(() => {
    setPage(1);
  }, [senderType]);

  return (
    <>
      <DashboardTopNav routeName="Jobs" pageFilters={pageFilters} />
      <MyJobsPageStyle className="flex-container">
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
        <div className="loader-container">
          {loading ? (
            <Loader size="lg" />
          ) : (
            <UiButton
              size="large"
              variant="secondary"
              disabled={page === totalPages || !totalPages}
              onClick={() => setPage(page + 1)}
            >
              Load more <UiIcon icon="Refresh" />
            </UiButton>
          )}
        </div>
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

  .loader-container {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      width: ${pxToRem(182)};
    }
  }
`;

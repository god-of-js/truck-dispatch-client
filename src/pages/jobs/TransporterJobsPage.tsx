import React, { useEffect, useMemo, useState } from 'react';

import JobItem from 'components/jobs/JobItem';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import { RootState } from 'modules/index';
import { getJobs, selectJob } from 'modules/Trips';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UiOverlay from 'ui/UiOverlay';
import { filterByFieldInObject, toAnyAction } from 'utils/helpers';
import Trip from 'types/Trip';
import UiInput from 'ui/UiInput';
import { clientBasedUserTypes } from 'utils/constants';
import JobsResponse from 'types/JobsResponse';
import ViewJobDetail from 'components/jobs/ViewJobDetail';
import BidForJob from 'components/jobs/BidForJob';
import { getTransporterBids } from 'modules/Bid';
import UiFilterTag from 'ui/UiFilterTag';
import AllBids from 'components/bids/AllBids';
import PaginationLoader from 'components/layout/PaginationLoader';
import UiSearchInput from 'ui/UiSearchInput';
import UiButton from 'ui/UiButton';

export default function TransporterJobs() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const senderType = searchParams.get('sender-type');
  const jobs = useSelector((state: RootState) => state.trips.jobs);
  const user = useSelector((state: RootState) => state.account.user);
  const bids = useSelector((state: RootState) => state.bid.bids);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allJobs, setAllJobs] = useState(0);
  const [allJobsByCompany, setAllJobsByCompany] = useState(0);
  const [allJobsByShipper, setAllJobsByShipper] = useState(0);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);
  const [isViewJobDetailsVisible, setIsViewJobDetailsVisible] = useState(false);
  const [isBidForJobVisible, setIsBidForJobVisible] = useState(false);
  const [isAllBidsVisible, setIsAllBidsVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const job = useSelector(selectJob(selectedJobId!));

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
    setSelectedJobId(jobId);
    setIsViewJobDetailsVisible(true);
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

  function bidForJob(jobId: string) {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      setIsViewJobDetailsVisible(false);
      return;
    }
    if (isViewJobDetailsVisible) setIsViewJobDetailsVisible(false);
    setSelectedJobId(jobId);
    setIsBidForJobVisible(true);
  }

  function backToJobDetails() {
    setIsViewJobDetailsVisible(true);
    setIsBidForJobVisible(false);
  }

  function closeViewDetails() {
    setIsViewJobDetailsVisible(false);
  }

  function closeBidOnJob() {
    setIsBidForJobVisible(false);
  }

  function openAllBids() {
    setIsAllBidsVisible(true);
  }
  function edgeNode() {
    return (
      <EdgeNode>
        <UiButton variant="secondary" size="large" onClick={openAllBids}>
          <span className="text">MY BIDS</span>
          <span className="count">{bids.length}</span>
        </UiButton>
      </EdgeNode>
    );
  }
  function handleQueryChange({
    value,
  }: {
    name: string;
    value: string | null;
  }) {
    setSearchQuery(value!);
  }

  useEffect(() => {
    loadJobs();
  }, [senderType, page]);

  useEffect(() => {
    setPage(1);
  }, [senderType]);

  useEffect(() => {
    dispatch(toAnyAction(getTransporterBids()));
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Jobs"
        pageFilters={pageFilters}
        handleQueryChange={handleQueryChange}
        edgeNode={edgeNode()}
      />
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

        <PaginationLoader
          loading={loading}
          page={page}
          totalPages={totalPages}
          nextPage={() => setPage(page + 1)}
        />
      </MyJobsPageStyle>
      <UiOverlay isVisible={isInformUserOfVerificationModalVisible}>
        <InformUserOfVerification
          onClose={() => setIsInformUserOfVerificationModalVisible(false)}
        />
      </UiOverlay>
      {job && (
        <>
          <UiOverlay isVisible={isViewJobDetailsVisible}>
            <ViewJobDetail
              job={job}
              bidOnJob={bidForJob}
              onClose={closeViewDetails}
            />
          </UiOverlay>
          <UiOverlay isVisible={isBidForJobVisible}>
            <BidForJob
              jobId={job._id}
              onClose={closeBidOnJob}
              backToJobDetails={backToJobDetails}
            />
          </UiOverlay>
        </>
      )}
      <UiOverlay isVisible={isAllBidsVisible}>
        <AllBids
          onClose={() => setIsAllBidsVisible(false)}
          editBid={(id) => {
            bidForJob(id);
            setIsAllBidsVisible(false);
          }}
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

const EdgeNode = styled.div`
  button {
    .text {
      text-transform: uppercase;
      font-size: ${pxToRem(14)};
      line-height: 140%;
      font-style: normal;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .count {
      border-radius: ${pxToRem(10)};
      padding: 0 ${pxToRem(4)};
      font-size: ${pxToRem(10)};
      letter-spacing: -0.02em;
      border-radius: ${pxToRem(2)};
      height: ${pxToRem(19)};
      width: ${pxToRem(12)};
      background: var(--color-primary-20);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

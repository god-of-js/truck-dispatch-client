import React, { useEffect, useMemo, useState } from 'react';

import JobItem from 'components/jobs/JobItem';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import { RootState } from 'modules/index';
import { getJobs, selectJob } from 'modules/Trips';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { filterByFieldInObject, toAnyAction } from 'utils/helpers';
import Trip from 'types/Trip';
import { clientBasedUserTypes } from 'utils/constants';
import JobsResponse from 'types/JobsResponse';
import ViewJobDetail from 'components/jobs/ViewJobDetail';
import BidForJob from 'components/jobs/BidForJob';
import { deleteBid, getTransporterBids } from 'modules/Bid';
import AllBids from 'components/bids/AllBids';
import PaginationLoader from 'components/layout/PaginationLoader';
import UiButton from 'ui/UiButton';
import UiFilterTag from 'ui/UiFilterTag';
import UiConfirmModal from 'ui/UiConfirmModal';
import { Toast } from 'utils/toast';
import UiEmptyList from 'ui/UiEmptyList';

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

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);
  const [isViewJobDetailsVisible, setIsViewJobDetailsVisible] = useState(false);
  const [isBidForJobVisible, setIsBidForJobVisible] = useState(false);
  const [isAllBidsVisible, setIsAllBidsVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [isDeleteBidVisible, setIsDeleteBidVisible] = useState(false);
  const [isDeleteBidLoading, setIsDeleteBidLoading] = useState(false);

  const job = useSelector(selectJob(selectedJobId!));

  const pageFilters = useMemo(
    () => [
      {
        title: 'All',
        route: '/available-jobs',
        value: allJobs,
        customWidth: 38,
      },
      {
        title: 'By Companies',
        route: '/available-jobs?sender-type=company',
        value: allJobsByCompany,
        customWidth: 112,
      },
      {
        title: 'By Shippers',
        route: '/available-jobs?sender-type=shipper',
        value: allJobsByShipper,
        customWidth: 94,
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
    setIsDeleteBidVisible(true);
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
  function showDeleteBidModal(bidId: string, tripId: string) {
    setSelectedJobId(tripId);
    setSelectedBidId(bidId);
    setIsDeleteBidVisible(true);
  }

  function deleteTransporterBid() {
    if (!selectedBidId || !selectedJobId) {
      Toast.error({ msg: 'Bid cannot be deleted' });
      return;
    }
    setIsDeleteBidLoading(true);
    dispatch(toAnyAction(deleteBid(selectedBidId, selectedJobId))).finally(
      () => {
        setIsDeleteBidLoading(false);
        setIsDeleteBidVisible(false);
      },
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

  function emptyJobs() {
    if (!loading && !jobs.length) {
      return (
        <UiEmptyList
          emptyIcon="Jobs"
          emptyText="There are no jobs available now, Please come back later"
        />
      );
    }
    return;
  }

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

        {(loading || !!filteredJobs.length) && (
          <PaginationLoader
            loading={loading}
            page={page}
            totalPages={totalPages}
            nextPage={() => setPage(page + 1)}
          />
        )}
      </MyJobsPageStyle>
      <InformUserOfVerification
        isVisible={isInformUserOfVerificationModalVisible}
        onClose={() => setIsInformUserOfVerificationModalVisible(false)}
      />
      {job && (
        <>
          <ViewJobDetail
            isVisible={isViewJobDetailsVisible}
            job={job}
            bidOnJob={bidForJob}
            onClose={closeViewDetails}
          />
          <BidForJob
            isVisible={isBidForJobVisible}
            jobId={job._id}
            onClose={closeBidOnJob}
            backToJobDetails={backToJobDetails}
          />
        </>
      )}
      <AllBids
        isVisible={isAllBidsVisible}
        onClose={() => setIsAllBidsVisible(false)}
        editBid={(id) => {
          bidForJob(id);
          setIsAllBidsVisible(false);
        }}
        deleteBid={showDeleteBidModal}
      />
      <UiConfirmModal
        isVisible={isDeleteBidVisible}
        title="Delete Bid"
        variant="danger"
        loading={isDeleteBidLoading}
        onClose={() => setIsDeleteBidVisible(false)}
        onProceed={deleteTransporterBid}
      >
        Are you sure you want to delete this bid? Your candidacy for this role
        would immediately be revoked.
      </UiConfirmModal>
      {emptyJobs()}
    </>
  );
}

const MyJobsPageStyle = styled.div`
  margin: ${pxToRem(32)} 0;
  padding: 0 ${pxToRem(24)};
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
  display: flex;
  gap: ${pxToRem(12)};
  .ui-filter-tag {
    cursor: pointer;
  }
`;

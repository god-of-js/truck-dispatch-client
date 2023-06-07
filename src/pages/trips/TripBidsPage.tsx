import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from 'modules/index';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiBackButton from 'ui/UiBackButton';
import TripBidItem from 'components/bids/TripBidItem';
import PaginationLoader from 'components/layout/PaginationLoader';
import { toAnyAction } from 'utils/helpers';
import { getBidsWithTripId } from 'modules/Bid';
import UiOverlay from 'ui/UiOverlay';
import TripBidFullDetails from 'components/bids/TripBidFullDetails';
import UiEmptyField from 'ui/UiEmptyList';
import MakePayment from 'components/payment/MakePayment';

export default function TripBidsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const bids = useSelector((state: RootState) => state.bid.bids);
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBidDetailsVisible, setIsBidDetailsVisible] = useState(false);
  const [isMakePaymentVisible, setIsMakePaymentVisible] = useState(true);
  const [activeBidId, setActiveBidId] = useState<string | null>(null);

  const bid = useMemo(() => {
    return bids.find(({ _id }) => _id === activeBidId);
  }, [activeBidId, bids]);

  function viewBid(bidId: string) {
    setActiveBidId(bidId);
    setIsBidDetailsVisible(true);
  }
  function viewSenderDetails(bidId: string) {
    // navigate(`/my-trips/${tripId}/bids/${bidId}`);
  }
  function negotiateBid(bidId: string) {
    setActiveBidId(bidId);
  }

  function acceptBid(bidId: string) {
    setActiveBidId(bidId);
    setIsMakePaymentVisible(true);
    setIsBidDetailsVisible(false);
  }

  function loadPage() {
    if (tripId) {
      dispatch(toAnyAction(getBidsWithTripId(tripId))).finally(() =>
        setPageLoading(false),
      );
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Transporter Bids"
        startNode={<UiBackButton />}
      />

      <PageStyling>
        {bids.map((bid) => (
          <TripBidItem
            bid={bid}
            key={bid._id}
            negotiate={negotiateBid}
            accept={acceptBid}
            viewBidDetails={viewBid}
            viewSenderDetails={viewSenderDetails}
          />
        ))}
      </PageStyling>
      {!bids.length && (
        <UiEmptyField
          emptyIcon="Jobs"
          emptyText="Nothing here yet. Your trip has been broadcasted to our network. Watch this page for bids"
        />
      )}
      <PaginationLoader
        loading={pageLoading}
        nextPage={loadPage}
        totalPages={totalPages}
        page={page}
      />
      {isMakePaymentVisible}
      {bid && (
        <>
          <UiOverlay isVisible={isBidDetailsVisible}>
            <TripBidFullDetails
              bid={bid}
              negotiate={negotiateBid}
              accept={acceptBid}
              onClose={() => setIsBidDetailsVisible(false)}
            />
          </UiOverlay>
          <UiOverlay isVisible={isMakePaymentVisible}>
            <MakePayment onClose={() => setIsMakePaymentVisible(false)} />
          </UiOverlay>
        </>
      )}
    </>
  );
}

const PageStyling = styled.div`
  margin: ${pxToRem(32)} 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(20)};
`;

import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from 'modules/index';
import {
  priceWithTDPercent,
  searchObjectsByField,
  toAnyAction,
} from 'utils/helpers';
import { getBidsWithTripId } from 'modules/Bid';
import { assignTrip, selectTrip } from 'modules/Trips';
import AssignTripFormData from 'types/AssignTripFormData';
import { Toast } from 'utils/toast';
import Payment from 'types/Payment';
import SuccessGif from '../../assets/img/success.gif';

const DashboardTopNav = lazy(() => import('components/layout/DashboardTopNav'));

const UiBackButton = lazy(() => import('ui/UiBackButton'));
const TripBidItem = lazy(() => import('components/bids/TripBidItem'));
const PaginationLoader = lazy(
  () => import('components/layout/PaginationLoader'),
);
const TripBidFullDetails = lazy(
  () => import('components/bids/TripBidFullDetails'),
);
const UiEmptyList = lazy(() => import('ui/UiEmptyList'));
const MakePayment = lazy(() => import('components/payment/MakePayment'));
const UiConfirmModal = lazy(() => import('ui/UiConfirmModal'));

export default function TripBidsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector(selectTrip(tripId!));
  const user = useSelector((state: RootState) => state.account.user);
  const bids = useSelector((state: RootState) => state.bid.bids);
  const [pageLoading, setPageLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBidDetailsVisible, setIsBidDetailsVisible] = useState(false);
  const [isPayWithBalanceVisible, setIsPayWithBalanceVisible] = useState(false);
  const [isMakePaymentVisible, setIsMakePaymentVisible] = useState(false);
  const [isPaymentSuccessfulVisible, setIsPaymentSuccessfulVisible] =
    useState(false);
  const [activeBidId, setActiveBidId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const bid = useMemo(() => {
    return bids.find(({ _id }) => _id === activeBidId);
  }, [activeBidId, bids]);

  const sortedBids = useMemo(() => {
    if (!searchQuery) return bids;

    return searchObjectsByField(
      bids.map((bid) => ({
        ...bid,
        fullName: `${bid.transporter.firstName} ${bid.transporter.lastName}`,
      })),
      searchQuery,
      ['fullName'],
    );
  }, [bids, searchQuery]);
  function handleQueryChange({
    value,
  }: {
    name: string;
    value: string | null;
  }) {
    setSearchQuery(value!);
  }
  function viewBid(bidId: string) {
    setActiveBidId(bidId);
    setIsBidDetailsVisible(true);
  }

  function viewSenderDetails(bidId: string) {
    // navigate(`/my-trips/${tripId}/bids/${bidId}`);
  }

  function negotiateBid(bidId: string) {
    const chosenBid = bids.find(({ _id }) => _id === bidId);
    navigate(
      `/chat?transporterId=${chosenBid?.transporter._id}&clientId=${user?._id}`,
    );
  }

  function acceptBid(bidId: string) {
    if (trip?.status !== 'awaiting-bid') {
      navigate(`/my-trips/${tripId}`);
      return;
    }
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

  function navigateToTripDetails() {
    navigate(`/my-trips/${tripId}`);
  }

  function assignTripToTransporter(
    paymentMethod: 'paystack' | 'balance',
    payment?: Payment,
  ) {
    if (!bid || !trip || !user) {
      Toast.error({ msg: 'User or Trip does not exist' });
      return;
    }
    setAssignLoading(true);
    const paymentData: AssignTripFormData = {
      from: user._id,
      to: bid.transporter._id,
      tripId: trip._id,
      bidId: bid._id,
      amountInBid: bid?.price,
      totalAmountPaid: priceWithTDPercent(bid?.price),
      transaction: payment?.transaction,
      paymentSource: paymentMethod,
    };

    if (payment) paymentData.processorReference = payment.reference;
    dispatch(toAnyAction(assignTrip(paymentData)))
      .then(() => {
        setIsPaymentSuccessfulVisible(true);
        setIsMakePaymentVisible(false);
        setIsPayWithBalanceVisible(false);
      })
      .finally(() => setAssignLoading(false));
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Transporter Bids"
        startNode={
          <UiBackButton text="Trip Details" route={`/my-trips/${tripId}`} />
        }
        searchQuery={searchQuery}
        handleQueryChange={handleQueryChange}
      />

      <PageStyling>
        {sortedBids.map((bid) => (
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
        <UiEmptyList
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

      {bid && (
        <>
          <TripBidFullDetails
            bid={bid}
            isVisible={isBidDetailsVisible}
            negotiate={negotiateBid}
            accept={acceptBid}
            onClose={() => setIsBidDetailsVisible(false)}
          />
          <MakePayment
            loading={assignLoading}
            bid={bid}
            isVisible={isMakePaymentVisible}
            payWithBalance={() => setIsPayWithBalanceVisible(true)}
            payWithPaystack={(param) =>
              assignTripToTransporter('paystack', param)
            }
            onClose={() => setIsMakePaymentVisible(false)}
          />
          <UiConfirmModal
            isVisible={isPayWithBalanceVisible}
            loading={assignLoading}
            variant="secondary"
            notYetVariant="danger-secondary"
            title="Approve Payment"
            onClose={() => setIsPayWithBalanceVisible(false)}
            onProceed={() => assignTripToTransporter('balance')}
          >
            <b>&#8358;{bid.price}</b> will be deducted from your wallet balance.{' '}
            <br />
            Do you want to proceed?
          </UiConfirmModal>
          <UiConfirmModal
            isVisible={isPaymentSuccessfulVisible}
            onProceed={navigateToTripDetails}
            onClose={() => setIsPaymentSuccessfulVisible(false)}
            title="Payment Successful"
            hideNotYetButton
            confirmText="Go to trip details"
            assetNode={<img src={SuccessGif} alt="payment_image" />}
          >
            Payment Successfully Made
          </UiConfirmModal>
        </>
      )}
    </>
  );
}

const PageStyling = styled.div`
  margin: ${pxToRem(32)} 0;
  padding: 0 ${pxToRem(24)};
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(20)};
`;

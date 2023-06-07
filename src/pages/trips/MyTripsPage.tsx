import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import { Icons } from 'ui/UiIcon';
import { clientBasedUserTypes, serviceBasedUserTypes } from 'utils/constants';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import {
  convertToFullDate,
  filterByFieldInObject,
  toAnyAction,
} from 'utils/helpers';
import {
  cancelTripByTransporter,
  cancelTripByTripCreator,
  getTrips,
  selectJob,
  unassignTrip,
} from 'modules/Trips';
import TripsPaginatedResponse from 'types/TripsPaginatedResponse';
import { useLocation, useNavigate } from 'react-router-dom';
import UiTable from 'ui/UiTable';
import Trip from 'types/Trip';
import { DropDownData } from 'ui/UiDropdownMenu';
import UiPill from 'ui/UiPill';
import User from 'types/User';
import UiFilterTag from 'ui/UiFilterTag';
import UiInput from 'ui/UiInput';
import { deleteBid, getTransporterBids } from 'modules/Bid';
import PaginationLoader from 'components/layout/PaginationLoader';
import UiOverlay from 'ui/UiOverlay';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';
import ViewJobDetail from 'components/jobs/ViewJobDetail';
import BidForJob from 'components/jobs/BidForJob';
import AllBids from 'components/bids/AllBids';
import CreateTrip from 'components/trips/CreateTrip';
import TripHasBeenBroadcasted from 'components/trips/TripHasBeenBroadcasted';
import { searchObjectsByField } from 'utils/helpers';
import UserDetails from 'ui/UserDetails';
import UiConfirmModal from 'ui/UiConfirmModal';
import { Toast } from 'utils/toast';

export default function MyTripsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.account.user);
  const trips = useSelector((state: RootState) => state.trips.trips);
  const bids = useSelector((state: RootState) => state.bid.bids);
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [totalPendingTrips, setTotalPendingTrips] = useState(0);
  const [totalInProgressTrips, setTotalInProgressTrips] = useState(0);
  const [totalCompletedTrips, setTotalCompletedTrips] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);
  const [isViewJobDetailsVisible, setIsViewJobDetailsVisible] = useState(false);
  const [isBidForJobVisible, setIsBidForJobVisible] = useState(false);
  const [isAllBidsVisible, setIsAllBidsVisible] = useState(false);
  const [isCancelTripVisible, setIsCancelTripVisible] = useState(false);
  const [isCancelTripLoading, setIsCancelTripLoading] = useState(false);
  const [isCreateTripVisible, setIsCreateTripVisible] = useState(false);
  const [isTripBroadcastedVisible, setIsTripBroadcastedVisible] =
    useState(false);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [isDeleteBidVisible, setIsDeleteBidVisible] = useState(false);
  const [isDeleteBidLoading, setIsDeleteBidLoading] = useState(false);
  const job = useSelector(selectJob(selectedJobId!));

  const headers = useMemo(
    () =>
      [
        {
          title: 'Trip Owner',
          query: 'tripOwnerDetails',
        },
        {
          title: 'Assigned Transporter',
          query: 'responsibleTransporter',
        },
        {
          title: 'Type Of Goods',
          query: 'typeOfGoods',
        },
        {
          title: 'Pick Up Address',
          query: 'pickUpAddress',
        },
        {
          title: 'Delivery Address',
          query: 'deliveryAddress',
        },
        {
          title: 'Pickup Date',
          query: 'pickUpDate',
        },
        {
          title: 'Delivery Date',
          query: 'deliveryDate',
        },
        {
          title: 'Trip Status',
          query: 'statusField',
        },
      ].filter(({ query }) => {
        if (
          clientBasedUserTypes.includes(user?.userType!) &&
          query === 'tripOwnerDetails'
        ) {
          return false;
        } else if (
          serviceBasedUserTypes.includes(user?.userType!) &&
          query === 'responsibleTransporter'
        ) {
          return false;
        }

        return true;
      }),
    [user],
  );

  const filters = useMemo(
    () => [
      {
        title: 'All',
        route: '/my-trips',
        value: totalTrips,
      },
      {
        title: 'Awaiting Bid',
        route: '/my-trips?status=awaiting-bid',
        value: totalPendingTrips,
      },
      {
        title: 'Ongoing',
        route: '/my-trips?status=in-progress',
        value: totalInProgressTrips,
      },
      {
        title: 'Completed',
        route: '/my-trips?status=completed',
        value: totalCompletedTrips,
      },
    ],
    [totalTrips, totalPendingTrips, totalInProgressTrips, totalCompletedTrips],
  );

  const searchFields: (keyof Trip)[] = ['transporter'];

  const  queriedTrips = useMemo(() => {
    if (searchQuery) return searchObjectsByField<Trip>(trips, searchQuery, searchFields);

    if (status) return filterByFieldInObject<Trip>('status', status, trips)

    return trips

  }, [searchQuery, trips, status])

  const tripsData = useMemo(() => {
    return queriedTrips.map(
      (trip: Trip) => ({
        ...trip,
        id: trip._id,
        typeOfGoods: <TypeOfGoods>{trip.typeOfGoods}</TypeOfGoods>,
        responsibleTransporter: userDetails(trip, trip.transporter),
        tripOwnerDetails: userDetails(trip, trip.tripOwner),
        pickUpDate: <DateText>{convertToFullDate(trip.pickUpDate)}</DateText>,
        deliveryDate: <DateText>{convertToFullDate(trip.deliveryDate)}</DateText>,
        statusField: (
          <UiPill variant={getPillVariant(trip.status)}>
            {formatStatus(trip.status)}
          </UiPill>
        ),
      }),
    );
  }, [trips, searchQuery]);

  function getPillVariant(status: Trip['status']) {
    if (status === 'awaiting-bid') return 'orange';
    if (status === 'assigned') return 'rose';
    if (status === 'in-progress') return 'info';
    if (status === 'completed') return 'success';

    return 'success';
  }

  function formatStatus(status: Trip['status']) {
    if (status === 'assigned') return 'Assigned';
    if (status === 'awaiting-bid') return 'Awaiting Bid';
    if (status === 'in-progress') return 'Ongoing';
    if (status === 'completed') return 'Completed';
  }

  function userDetails(trip: Trip, tripUser?: User) {
    if (!tripUser) return 'Not yet assigned';

    return (
      <UserDetails
        userName={`${tripUser.firstName} ${tripUser.lastName}`}
        avatar={tripUser.avatar}
        profileSubtitle={trip.status !== 'completed' ? tripUser.phone : ''}
      />
    );
  }
  function dropDownData(item: unknown): DropDownData[] {
    const trip = item as Trip;
    return [
      {
        label: 'See trip details',
        func: navigateToTrip,
        endIcon: 'CaretRight' as Icons,
      },
      {
        label: 'Edit trip',
        func: editTrip,
      },
      {
        label: 'Unassign trip',
        func: initUnassignTrip,
        isDanger: true,
      },
      {
        label: 'Cancel trip',
        func: initCancelTrip,
        isDanger: true,
      },
    ].filter(({ label }) => {
      const editIsNotAllowedStatuses = ['in-progress', 'completed'];
      if (
        editIsNotAllowedStatuses.includes(trip.status) &&
        label === 'Edit trip'
      ) {
        return false;
      }

      if (
        serviceBasedUserTypes.includes(user?.userType!) &&
        (label === 'Edit trip' || label === 'Unassign trip')
      )
        return false;
      if (!trip.transporter && label === 'Unassign trip') return false;

      if (trip.status === 'completed' && label !== 'See trip details')
        return false;
      if (
        trip.paymentRequest?.status === 'completed' &&
        (label === 'Cancel trip' || label === 'Unassign trip')
      )
        return false;

      return true;
    });
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
  function loadTrips() {
    setLoading(true);
    dispatch(toAnyAction(getTrips({ page, limit: 20, status })))
      .then((response: TripsPaginatedResponse) => {
        setTotalPages(response.totalPages);
        setTotalTrips(response.totalItems);
        setTotalPendingTrips(response.pending);
        setTotalInProgressTrips(response.inProgress);
        setTotalCompletedTrips(response.completed);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function navigateToTrip(id: string) {
    navigate(`/my-trips/${id}`);
  }

  function editTrip(id: string) {
    if (serviceBasedUserTypes.includes(user?.userType!)) return;
    setActiveTripId(id);
    // Also used for editing trip;
    setIsCreateTripVisible(true);
  }

  function initUnassignTrip(id: string) {
    dispatch(toAnyAction(unassignTrip(id)));
  }

  function initCancelTrip(id: string) {
    setActiveTripId(id);
    setIsCancelTripVisible(true);
  }
  function cancelTrip() {
    if (!activeTripId) {
      Toast.error({ msg: 'Trip ID was not provided.' });
      return;
    }
    setIsCancelTripLoading(true);
    const action = clientBasedUserTypes.includes(user?.userType!)
      ? cancelTripByTripCreator
      : cancelTripByTransporter;

    dispatch(toAnyAction(action(activeTripId))).finally(() => {
      setIsCancelTripLoading(false);
      setIsCancelTripVisible(false);
    });
  }

  function openAllBids() {
    setIsAllBidsVisible(true);
  }

  function handleQueryChange({
    value,
  }: {
    name: string;
    value: string | null;
  }) {
    setSearchQuery(value!);
  }

  function edgeNode() {
    return (
      <EdgeNodeContainer>
        {clientBasedUserTypes.includes(user?.userType!) && (
          <UiButton size="md" onClick={() => setIsCreateTripVisible(true)}>
            <UiIcon icon="TruckTick" /> <span>Create new trip</span>
          </UiButton>
        )}
        {serviceBasedUserTypes.includes(user?.userType!) && (
          <UiFilterTag
            title="MY BIDS"
            isActive={true}
            value={bids.length}
            onClick={openAllBids}
          />
        )}
      </EdgeNodeContainer>
    );
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

  function showTripBroadcasted(tripId: string) {
    setActiveTripId(tripId);
    setIsTripBroadcastedVisible(true);
  }

  function emptyTableBtnContent() {
    if (serviceBasedUserTypes.includes(user?.userType!)) return 'See Jobs';

    return (
      <>
        <UiIcon icon="TruckTick" />
        <span>Create new trip</span>
      </>
    );
  }

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    loadTrips();
  }, [page, status]);

  useEffect(() => {
    dispatch(toAnyAction(getTransporterBids()));
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="My Trips"
        handleQueryChange={handleQueryChange}
        searchQuery={searchQuery}
        pageFilters={filters}
        edgeNode={edgeNode()}
      />
      <MyTripsPageStyle>
        <UiTable
          data={tripsData}
          headers={headers}
          tableTitle="My Trips"
          onRowClick={navigateToTrip}
          options={dropDownData}
          emptyTableIcon="TruckTick"
          emptyTableText="You don’t have any trip here yet, Bid for jobs to get trips"
          emptyTableBtnContent={emptyTableBtnContent()}
        />
        {tripsData.length && (
          <PaginationLoader
            loading={loading}
            page={page}
            totalPages={totalPages}
            nextPage={() => setPage(page + 1)}
          />
        )}
      </MyTripsPageStyle>

      {/* MODALS */}
      <UiOverlay isVisible={isCreateTripVisible}>
        <CreateTrip
          tripId={activeTripId!}
          onClose={() => {
            setIsCreateTripVisible(false);
            setActiveTripId(null);
          }}
          onCreated={showTripBroadcasted}
        />
      </UiOverlay>
      {activeTripId && (
        <UiOverlay isVisible={isTripBroadcastedVisible}>
          <TripHasBeenBroadcasted
            tripId={activeTripId!}
            onClose={() => setIsTripBroadcastedVisible(false)}
          />
        </UiOverlay>
      )}
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
          deleteBid={showDeleteBidModal}
        />
      </UiOverlay>

      <UiOverlay isVisible={isCancelTripVisible}>
        <UiConfirmModal
          title="Cancel Trip"
          variant="danger"
          loading={isCancelTripLoading}
          onClose={() => setIsCancelTripVisible(false)}
          onProceed={cancelTrip}
        >
          Are you sure you want to cancel this trip? This process cannot be
          undone.
        </UiConfirmModal>
      </UiOverlay>
      <UiOverlay isVisible={isDeleteBidVisible}>
        <UiConfirmModal
          title="Delete Bid"
          variant="danger"
          loading={isDeleteBidLoading}
          onClose={() => setIsDeleteBidVisible(false)}
          onProceed={deleteTransporterBid}
        >
          Are you sure you want to delete this bid? Your candidacy for this role
          would immediately be revoked.
        </UiConfirmModal>
      </UiOverlay>
    </>
  );
}

const MyTripsPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

const TypeOfGoods = styled.span`
  font-family: 'thiccboi-bold';
  font-style: normal;
  font-weight: 600;
  font-size: ${pxToRem(14)};
  line-height: 140%;
  letter-spacing: -0.02em;
  color: var(--color-neutralBlack);
  text-transform: capitalize;
`;
const EdgeNodeContainer = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  .ui-filter-tag {
    cursor: pointer;
  }
`;

const DateText = styled.span`
  font-family: 'thiccboi-bold';
  font-weight: 600;
`;

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import { clientBasedUserTypes, serviceBasedUserTypes } from 'utils/constants';
import Loader from 'components/layout/Loader';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import { filterByFieldInObject, toAnyAction } from 'utils/helpers';
import { getTrips } from 'modules/Trips';
import TripsPaginatedResponse from 'types/TripsPaginatedResponse';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UiTable from 'ui/UiTable';
import Trip from 'types/Trip';
import { DropDownData } from 'ui/UiDropdownMenu';
import UiPill from 'ui/UiPill';
import User from 'types/User';
import UiAvatar from 'ui/UiAvatar';

export default function MyTripsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.account.user);
  const trips = useSelector((state: RootState) => state.trips.trips);
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [totalPendingTrips, setTotalPendingTrips] = useState(0);
  const [totalInProgressTrips, setTotalInProgressTrips] = useState(0);
  const [totalCompletedTrips, setTotalCompletedTrips] = useState(0);

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

  const tripsData = useMemo(() => {
    const data = status
      ? filterByFieldInObject<Trip>('status', status, trips)
      : trips;

    return data.map((trip: Trip) => ({
      ...trip,
      id: trip._id,
      responsibleTransporter: userDetails(trip.transporter),
      tripOwnerDetails: userDetails(trip.tripOwner),
      statusField: (
        <UiPill variant={getPillVariant(trip.status)}>
          {formatStatus(trip.status)}
        </UiPill>
      ),
    }));
  }, [trips]);

  function getPillVariant(status: Trip['status']) {
    if (status === 'awaiting-bid') return 'gray';
    if (status === 'payment-complete') return 'warning';
    if (status === 'in-progress') return 'info';
    if (status === 'completed') return 'success';

    return 'success';
  }

  function formatStatus(status: Trip['status']) {
    if (status === 'payment-complete') return 'Pending';
    if (status === 'awaiting-bid') return 'Awaiting Bid';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'completed') return 'Completed';
  }

  function userDetails(tripUser?: User) {
    if (!tripUser) return 'Not yet assigned';

    return (
      <TransporterDetails>
        <UiAvatar avatar={tripUser.avatar} />
        <div>
          <div>{`${tripUser.firstName} ${tripUser.lastName}`}</div>
          <div className="transporter-phone">{tripUser.phone}</div>
        </div>
      </TransporterDetails>
    );
  }
  function dropDownData(item: unknown): DropDownData[] {
    const trip = item as Trip;
    return [
      {
        label: 'View Trip',
        func: navigateToTrip,
      },
      {
        label: 'Edit Trip',
        func: editTrip,
      },
      {
        label: 'Unassign Trip',
        func: unassignTrip,
        isDanger: true,
      },
      {
        label: 'Cancel Trip',
        func: cancelTrip,
        isDanger: true,
      },
    ].filter(({ label }) => {
      const editIsNotAllowedStatuses = ['in-progress', 'completed'];
      if (
        editIsNotAllowedStatuses.includes(trip.status) &&
        label === 'Edit Trip'
      ) {
        return false;
      }

      if (
        serviceBasedUserTypes.includes(user?.userType!) &&
        (label === 'Edit Trip' || label === 'Unassign Trip')
      )
        return false;

      return true;
    });
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
    navigate(`/my-trips/${id}/edit`);
  }

  function unassignTrip(id: string) {}
  function cancelTrip(id: string) {}

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    loadTrips();
  }, [page, status]);

  return (
    <>
      <DashboardTopNav routeName="My Trips" pageFilters={filters} />
      <MyTripsPageStyle>
        {clientBasedUserTypes.includes(user?.userType!) && (
          <CreateTripButtonContainer>
            <Link to="/my-trips/new">
              <UiButton size="md">Create New Trip</UiButton>
            </Link>
          </CreateTripButtonContainer>
        )}
        <UiTable
          data={tripsData}
          headers={headers}
          tableTitle="My Trips"
          onRowClick={navigateToTrip}
          options={dropDownData}
          noDataParagraphText="You have no trips. Create new trip by clicking the button above."
        />
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
      </MyTripsPageStyle>
    </>
  );
}

const MyTripsPageStyle = styled.div`
  padding: ${pxToRem(24)};
  .loader-container {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      width: ${pxToRem(182)};
    }
  }
`;

const CreateTripButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${pxToRem(8)};
`;

const TransporterDetails = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  align-items: center;
  .transporter-phone {
    font-weight: 400;
    font-size: ${pxToRem(14)};
  }
`;

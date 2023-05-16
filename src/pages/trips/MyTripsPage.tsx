import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import ShipperTripPageContent from 'components/trips/ShipperTripPageContent';
import TransporterTripPageContent from 'components/trips/TransporterTripPageContent';
import { clientBasedUserTypes } from 'utils/constants';
import Loader from 'components/layout/Loader';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import { toAnyAction } from 'utils/helpers';
import { getTrips } from 'modules/Trips';
import TripsPaginatedResponse from 'types/TripsPaginatedResponse';
import { useLocation } from 'react-router-dom';

export default function MyTripsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);
  const [totalPendingTrips, setTotalPendingTrips] = useState(0);
  const [totalInProgressTrips, setTotalInProgressTrips] = useState(0);
  const [totalCompletedTrips, setTotalCompletedTrips] = useState(0);

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
        {clientBasedUserTypes.includes(user?.userType!) ? (
          <ShipperTripPageContent status={status} />
        ) : (
          <TransporterTripPageContent status={status} />
        )}
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

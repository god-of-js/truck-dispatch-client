import React, { lazy, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTrip, selectTrip } from 'modules/Trips';

import { toAnyAction } from 'utils/helpers';
import { getTripRating } from 'modules/Ratings';
import Rating from 'types/Rating';

const Loader = lazy(() => import('components/layout/Loader'));
const RateTransporter = lazy(() => import('components/ratings/RateUser'));
const PageError = lazy(() => import('components/errors/PageError'));

export default function TripLayout() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const trip = useSelector(selectTrip(tripId!));
  const [isRatingsModalVisible, setIsRatingsModalVisible] = useState(false);
  const [errorCode, setErrorCode] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);

  function closeRateTransporter() {
    setIsRatingsModalVisible(false);
  }

  function loadTrip() {
    setLoading(true);
    dispatch(toAnyAction(getTrip(tripId!)))
      .catch((error: { status: number }) => {
        setErrorCode(error.status);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!trip) loadTrip();

    if (trip?.status === 'completed') {
      dispatch(toAnyAction(getTripRating(tripId!))).then((data: Rating) => {
        if (!data) setIsRatingsModalVisible(true);
      });
    }
  }, [tripId, trip]);

  return (
    <>
      {/* TODO: Deprecate this Layout file. */}
      {loading ? <Loader /> : <Outlet />}
      {!!errorCode && (
        <PageError
          errorCode={errorCode}
          goToRoute="/my-trips"
          buttonText="My Trips"
        />
      )}
      <RateTransporter
        isVisible={isRatingsModalVisible}
        onClose={closeRateTransporter}
      />
    </>
  );
}

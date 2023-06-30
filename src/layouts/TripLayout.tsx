import React, { lazy, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTrip, selectTrip } from 'modules/Trips';

import { toAnyAction } from 'utils/helpers';
import { getTripRating } from 'modules/Ratings';
import Rating from 'types/Rating';
import { RootState } from 'modules/index';
import { clientBasedUserTypes } from 'utils/constants';

const Loader = lazy(() => import('components/layout/Loader'));
const RateTransporter = lazy(() => import('components/ratings/RateUser'));

export default function TripLayout() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
  const trip = useSelector(selectTrip(tripId!));
  const [isRatingsModalVisible, setIsRatingsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function closeRateTransporter() {
    setIsRatingsModalVisible(false);
  }

  function loadTrip() {
    setLoading(true);
    dispatch(toAnyAction(getTrip(tripId!))).finally(() => {
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
      <RateTransporter
        isVisible={isRatingsModalVisible}
        onClose={closeRateTransporter}
      />
    </>
  );
}

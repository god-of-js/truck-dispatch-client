import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTrip, selectTrip } from 'modules/Trips';

import Loader from 'components/layout/Loader';
import UiOverlay from 'ui/UiOverlay';
import RateTransporter from 'components/ratings/RateUser';
import { toAnyAction } from 'utils/helpers';
import { getTripRating } from 'modules/Ratings';
import Rating from 'types/Rating';
import { getPaymentRequestByTripId } from 'modules/Payments';
import { RootState } from 'modules/index';
import { clientBasedUserTypes } from 'utils/constants';

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

    if (
      clientBasedUserTypes.includes(user?.userType!) &&
      trip?.status === 'completed'
    ) {
      dispatch(toAnyAction(getTripRating(tripId!))).then((data: Rating) => {
        if (!data) setIsRatingsModalVisible(true);
      });
    }
  }, [tripId, trip]);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestByTripId(tripId!)));
  }, [tripId]);

  return (
    <>
      {/* TODO: Deprecate this Layout file. */}
      {loading ? <Loader /> : <Outlet />}
      <UiOverlay isVisible={isRatingsModalVisible}>
        <RateTransporter onClose={closeRateTransporter} />
      </UiOverlay>
    </>
  );
}

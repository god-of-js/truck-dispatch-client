import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { toAnyAction } from 'utils/helpers';
import { getBidsWithTripId } from 'modules/Bid';
import Loader from 'components/layout/Loader';

export default function ViewTripBidsLayout() {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      dispatch(toAnyAction(getBidsWithTripId(tripId))).finally(() =>
        setLoading(false),
      );
    }
  }, []);

  return <>{loading ? <Loader /> : <Outlet />}</>;
}

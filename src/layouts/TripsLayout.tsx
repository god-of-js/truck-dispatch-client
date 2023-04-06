import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { toAnyAction } from 'utils/helpers';
import Loader from 'components/layout/Loader';
import { getTrips } from 'modules/Trips';

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  function loadTrips() {
    dispatch(toAnyAction(getTrips())).finally(() => {
      setLoading(false);
    });
  }
  useEffect(() => {
    loadTrips();
  }, []);

  const Component = isLoading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
  return <div className="body-components-container">{Component}</div>;
}

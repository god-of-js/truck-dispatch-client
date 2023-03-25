import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { toAnyAction } from 'utils/helpers';
import Loader from 'components/layout/Loader';
import { getAgentTrips, getTransporterTrips } from 'modules/Trips';
import { RootState } from 'modules/index';

export default function DashboardLayout() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  function loadTrips() {
    if (!user) return;
    // if (user.userType === 'agent') {
    //   dispatch(toAnyAction(getAgentTrips(user.id))).finally(() => {
    //     setLoading(false);
    //   });
    // } else if (user.userType === 'transporter') {
    //   dispatch(toAnyAction(getTransporterTrips(user.id))).finally(() => {
    //     setLoading(false);
    //   });
    // }
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

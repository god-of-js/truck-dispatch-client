import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from 'components/layout/Loader';

export default function DashboardLayout() {
  return (
    <div className="body-components-container">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Loader = lazy(() => import('components/layout/Loader'));

export default function DashboardLayout() {
  return (
    <div className="body-components-container">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

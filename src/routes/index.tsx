import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

const ComponentsView = lazy(() => import('../pages/Components'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <PageError />,
  },
  {
    path: 'components',
    element: <ComponentsView />,
  },
]);

export default router;

import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));

const ComponentsView = lazy(() => import('../pages/Components'));

const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));

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
  {
    path: 'join/transporter',
    element: (
      <AuthLayout>
        <RegistrationPage />
      </AuthLayout>
    ),
  },
]);

export default router;

import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const ComponentsView = lazy(() => import('../pages/Components'));

const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <PageError />,
    children: [],
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
  {
    path: 'join/agent',
    element: (
      <AuthLayout userType="agent">
        <RegistrationPage userType="agent" />
      </AuthLayout>
    ),
  },
  {
    path: 'login',
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
]);

export default router;

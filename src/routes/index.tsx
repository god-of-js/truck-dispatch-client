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
    id: '',
    element: <DashboardLayout />,
    errorElement: <PageError />,
    children: [],
  },
  {
    path: 'components',
    element: <ComponentsView />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'join/:userType',
        element: <RegistrationPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;

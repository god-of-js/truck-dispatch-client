import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const ProfileLayout = lazy(() => import('../layouts/ProfileLayout'));

const ComponentsView = lazy(() => import('../pages/Components'));

// Auth
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

// Profile
const ProfileDetailsPage = lazy(
  () => import('../pages/profile/ProfileDetailsPage'),
);
const TransporterVerificationPage = lazy(
  () => import('../pages/profile/TransporterVerificationPage'),
);
const TransporterAccountsPage = lazy(
  () => import('../pages/profile/TransporterAccountsPage'),
);

const router = createBrowserRouter([
  {
    path: '/',
    id: 'Dashboard',
    element: <DashboardLayout />,
    errorElement: <PageError />,
    children: [
      {
        path: 'profile',
        id: 'Profile',
        element: <ProfileLayout />,
        children: [
          {
            path: '',
            id: 'Profile Details',
            name: 'Profile',
            element: <ProfileDetailsPage />,
          },
          {
            path: 'verification',
            id: 'Verification Page',
            element: <TransporterVerificationPage />,
          },
          {
            path: 'accounts',
            id: 'Accounts',
            element: <TransporterAccountsPage />,
          },
        ],
      },
    ],
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

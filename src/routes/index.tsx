import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const ProfileLayout = lazy(() => import('../layouts/ProfileLayout'));
const ViewTripLayout = lazy(() => import('../layouts/ViewTripLayout'));
const TripsLayout = lazy(() => import('../layouts/TripsLayout'));

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

// DASHBOARD
const MyTripsPage = lazy(() => import('../pages/trips/MyTripsPage'));
const NewTripPage = lazy(() => import('../pages/trips/NewTripPage'));
const ViewTripPage = lazy(() => import('../pages/trips/ViewTripPage'));
const ViewTripBidsPage = lazy(() => import('../pages/trips/ViewTripBidsPage'));

const TransporterJobsPage = lazy(
  () => import('../pages/trips/TransporterJobsPage'),
);
const ViewTransporterJobDetailsPage = lazy(
  () => import('../pages/trips/ViewTransporterJobDetailsPage'),
);
const BidOnJobPage = lazy(() => import('../pages/trips/BidOnJobPage'));

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
      {
        path: '/my-trips',
        id: 'My Trips Layout',
        element: <TripsLayout />,
        children: [
          {
            path: '',
            id: 'My Trips',
            element: <MyTripsPage />,
          },
          {
            path: '/my-trips/new',
            id: 'New Trip',
            element: <NewTripPage />,
          },
          {
            path: '/my-trips/:tripId',
            id: 'View Trip Layout',
            element: <ViewTripLayout />,
            children: [
              {
                path: '',
                id: 'View Trip',
                element: <ViewTripPage />,
              },
              {
                path: '/my-trips/:tripId/bids',
                id: 'View Trip Bids',
                element: <ViewTripBidsPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/available-jobs',
        id: 'Jobs',
        element: <TransporterJobsPage />,
      },
      {
        path: '/available-jobs/:tripId',
        id: 'Job Detail',
        element: <ViewTransporterJobDetailsPage />,
      },
      {
        path: '/available-jobs/:tripId/bid',
        id: 'Bid on Job',
        element: <BidOnJobPage />,
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

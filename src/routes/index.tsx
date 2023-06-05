import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const ProfileLayout = lazy(() => import('../layouts/ProfileLayout'));
const TripLayout = lazy(() => import('../layouts/TripLayout'));
const TripBidsLayout = lazy(() => import('../layouts/ViewTripBidsLayout'));
const TripsLayout = lazy(() => import('../layouts/TripsLayout'));
const ChatLayout = lazy(() => import('../layouts/ChatLayout'));

// Auth
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const SelectUsertypePage = lazy(
  () => import('../pages/auth/SelectUsertypePage'),
);
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(
  () => import('../pages/auth/ForgotPasswordPage'),
);

// Profile
const ProfileDetailsPage = lazy(
  () => import('../pages/profile/ProfileDetailsPage'),
);
const ManagePasswordPage = lazy(
  () => import('../pages/profile/ManagePasswordPage'),
);
const TransporterVerificationPage = lazy(
  () => import('../pages/profile/TransporterVerificationPage'),
);
const TransporterAccountsPage = lazy(
  () => import('../pages/profile/TransporterAccountsPage'),
);

// DASHBOARD
const MyTripsPage = lazy(() => import('../pages/trips/MyTripsPage'));
const TripDetailsPage = lazy(() => import('../pages/trips/TripDetailsPage'));
const TripBidsPage = lazy(() => import('../pages/bids/TripBidsPage'));
const TripBidDetailsPage = lazy(() => import('../pages/bids/TripBidDetailsPage'));
const BidCheckoutPage = lazy(() => import('../pages/bids/BidCheckoutPage'));

const TransporterJobsPage = lazy(
  () => import('../pages/jobs/TransporterJobsPage'),
);
const ChatPage = lazy(() => import('../pages/chat/ChatPage'));

// VEHICLES
const VehiclesPage = lazy(() => import('../pages/vehicles/VehiclesPage'));

// Transactions

const PaymentsPage = lazy(
  () => import('../pages/payments/PaymentsPage'),
);

const router = createBrowserRouter([
  {
    path: '/',
    id: 'Dashboard',
    element: <DashboardLayout />,
    errorElement: <PageError />,
    children: [
      {
        path: '/profile',
        id: 'Profile',
        element: <ProfileLayout />,
        children: [
          {
            path: '',
            id: 'Profile Details',
            element: <ProfileDetailsPage />,
          },
          {
            path: '/profile/manage-password',
            id: 'Manage Password',
            element: <ManagePasswordPage />,
          },
          {
            path: '/profile/verification',
            id: 'Verification Page',
            element: <TransporterVerificationPage />,
          },
          {
            path: '/profile/accounts',
            id: 'Accounts',
            element: <TransporterAccountsPage />,
          },
        ],
      },
      {
        path: '/chat',
        id: 'Chat',
        element: <ChatLayout />,
        children: [
          {
            path: '/chat/:chatLogId',
            id: 'Message',
            element: <ChatPage />,
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
            path: '/my-trips/:tripId',
            id: 'Trip Layout',
            element: <TripLayout />,
            children: [
              {
                path: '/my-trips/:tripId',
                id: 'TripDetails',
                element: <TripDetailsPage />,
              },
              {
                path: '/my-trips/:tripId/bids',
                id: 'TripBidsLayout',
                element: <TripBidsLayout />,
                children: [
                  {
                    path: '',
                    id: 'Trip Bids',
                    element: <TripBidsPage />,
                  },
                  {
                    path: '/my-trips/:tripId/bids/:bidId',
                    id: 'Trip Bid',
                    element: <TripBidDetailsPage />,
                  },
                  {
                    path: '/my-trips/:tripId/bids/:bidId/checkout',
                    id: 'Checkout Trip Bid',
                    element: <BidCheckoutPage />,
                  },
                ],
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
        path: '/vehicles',
        id: 'Vehicles',
        element: <VehiclesPage />,
      },
      {
        path: '/payments',
        id: 'Payments',
        element: <PaymentsPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'join',
        element: <SelectUsertypePage />,
      },
      {
        path: 'join/:userType',
        element: <RegistrationPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);

export default router;

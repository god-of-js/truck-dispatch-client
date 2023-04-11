import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const ProfileLayout = lazy(() => import('../layouts/ProfileLayout'));
const ViewTripLayout = lazy(() => import('../layouts/ViewTripLayout'));
const ViewTripBidsLayout = lazy(() => import('../layouts/ViewTripBidsLayout'));
const TripsLayout = lazy(() => import('../layouts/TripsLayout'));
const ChatLayout = lazy(() => import('../layouts/ChatLayout'));

// Auth
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const SelectUsertypePage = lazy (() => import('../pages/auth/SelectUsertypePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RequestVerificationCodePage = lazy(
  () => import('../pages/auth/RequestVerificationCodePage'),
);

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
const ViewTripStatusPage = lazy(
  () => import('../pages/trips/ViewTripStatusPage'),
);
const ViewTripRequestPaymentPage = lazy(
  () => import('../pages/trips/RequestPaymentPage'),
);
const ViewTripTDOPage = lazy(() => import('../pages/trips/ViewTripTDOPage'));
const ViewRequestForPayment = lazy(
  () => import('../pages/trips/ViewRequestForPayment'),
);
const ViewTripBidsPage = lazy(() => import('../pages/bids/ViewTripBidsPage'));
const ViewTripBidPage = lazy(() => import('../pages/bids/ViewTripBidPage'));
const BidCheckoutPage = lazy(() => import('../pages/bids/BidCheckoutPage'));

const TransporterJobsPage = lazy(
  () => import('../pages/jobs/TransporterJobsPage'),
);
const ViewTransporterJobDetailsPage = lazy(
  () => import('../pages/jobs/ViewTransporterJobDetailsPage'),
);
const BidOnJobPage = lazy(() => import('../pages/jobs/BidOnJobPage'));

const ChatPage = lazy(() => import('../pages/chat/ChatPage'));

//Transactions

const ViewPaymentsPage = lazy(
  () => import('../pages/payments/ViewPaymentsPage'),
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
            path: '/chat/:chatId',
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
            path: '/my-trips/new',
            id: 'New Trip',
            element: <NewTripPage />,
          },
          {
            path: '/my-trips/:tripId/edit',
            id: 'Edit Trip',
            element: <NewTripPage />,
          },
          {
            path: '/my-trips/:tripId',
            id: 'View Trip Layout',
            element: <ViewTripLayout />,
            children: [
              {
                path: '/my-trips/:tripId',
                id: 'View Trip',
                element: <ViewTripPage />,
              },
              {
                path: '/my-trips/:tripId/status',
                id: 'View Trip Status',
                element: <ViewTripStatusPage />,
              },
              {
                path: '/my-trips/:tripId/terminal-delivery-order',
                id: 'View Trip TDO',
                element: <ViewTripTDOPage />,
              },
              {
                path: '/my-trips/:tripId/request-payment-for-trip',
                id: 'Request payment for trip',
                element: <ViewTripRequestPaymentPage />,
              },
              {
                path: '/my-trips/:tripId/view-payment-request',
                id: 'View Request payment for trip',
                element: <ViewRequestForPayment />,
              },
              {
                path: '/my-trips/:tripId/bids',
                id: 'View Trip Bids Layout',
                element: <ViewTripBidsLayout />,
                children: [
                  {
                    path: '',
                    id: 'View Trip Bids',
                    element: <ViewTripBidsPage />,
                  },
                  {
                    path: '/my-trips/:tripId/bids/:bidId',
                    id: 'View Trip Bid',
                    element: <ViewTripBidPage />,
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
        path: '/available-jobs/:tripId',
        id: 'Job Detail',
        element: <ViewTransporterJobDetailsPage />,
      },
      {
        path: '/available-jobs/:tripId/bid',
        id: 'Bid on Job',
        element: <BidOnJobPage />,
      },
      {
        path: '/payments',
        id: 'Payments',
        element: <ViewPaymentsPage />,
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
        path: 'verify-phone/request-code',
        element: <RequestVerificationCodePage />,
      },
    ],
  },
]);

export default router;

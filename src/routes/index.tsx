import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PageError = lazy(() => import('../components/errors/PageError'));

// LAYOUTS
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const MarketingLayout = lazy(() => import('../layouts/MarketingLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const ProfileLayout = lazy(() => import('../layouts/ProfileLayout'));
const ViewTripLayout = lazy(() => import('../layouts/ViewTripLayout'));
const ViewTripBidsLayout = lazy(() => import('../layouts/ViewTripBidsLayout'));
const TripsLayout = lazy(() => import('../layouts/TripsLayout'));
const ChatLayout = lazy(() => import('../layouts/ChatLayout'));

const ComponentsView = lazy(() => import('../pages/Components'));

// MARKETING
const MarketingLandingPage = lazy(
  () => import('../pages/marketing/MarketingLandingPage'),
);
const FAQsPage = lazy(() => import('../pages/marketing/FAQsPage'));
const PrivacyPolicyPage = lazy(
  () => import('../pages/marketing/PrivacyPolicyPage'),
);
const AgentsTermsAndConditions = lazy(
  () => import('../pages/marketing/AgentsTermsAndConditions'),
);

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
const ViewTripStatusPage = lazy(
  () => import('../pages/trips/ViewTripStatusPage'),
);
const ViewTripRequestPaymentPage = lazy(
  () => import('../pages/trips/ViewTripRequestPaymentPage'),
);
const ViewTripTDOPage = lazy(() => import('../pages/trips/ViewTripTDOPage'));
const ViewRequestForPayment = lazy(
  () => import('../pages/trips/ViewRequestForPayment'),
);
const ViewTripBidsPage = lazy(() => import('../pages/bids/ViewTripBidsPage'));
const ViewTripBidPage = lazy(() => import('../pages/bids/ViewTripBidPage'));
const BidCheckoutPage = lazy(() => import('../pages/bids/BidCheckoutPage'));

const TransporterJobsPage = lazy(
  () => import('../pages/trips/TransporterJobsPage'),
);
const ViewTransporterJobDetailsPage = lazy(
  () => import('../pages/trips/ViewTransporterJobDetailsPage'),
);
const BidOnJobPage = lazy(() => import('../pages/bids/BidOnJobPage'));

const ChatPage = lazy(() => import('../pages/chat/ChatPage'));

//Transactions

const ViewPaymentsPage = lazy(
  () => import('../pages/payments/ViewPaymentsPage'),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        path: '',
        element: <MarketingLandingPage />,
      },
      {
        path: '/faqs',
        element: <FAQsPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '/terms-and-conditions',
        element: <AgentsTermsAndConditions />,
      },
    ],
  },
  {
    path: '/dashboard',
    id: 'Dashboard',
    element: <DashboardLayout />,
    errorElement: <PageError />,
    children: [
      {
        path: '/dashboard/profile',
        id: 'Profile',
        element: <ProfileLayout />,
        children: [
          {
            path: '',
            id: 'Profile Details',
            element: <ProfileDetailsPage />,
          },
          {
            path: '/dashboard/profile/verification',
            id: 'Verification Page',
            element: <TransporterVerificationPage />,
          },
          {
            path: '/dashboard/profile/accounts',
            id: 'Accounts',
            element: <TransporterAccountsPage />,
          },
        ],
      },
      {
        path: '/dashboard/chat',
        id: 'Chat',
        element: <ChatLayout />,
        children: [
          {
            path: '/dashboard/chat/:agentId/:transporterId',
            id: 'Message',
            element: <ChatPage />,
          },
        ],
      },
      {
        path: '/dashboard/my-trips',
        id: 'My Trips Layout',
        element: <TripsLayout />,
        children: [
          {
            path: '',
            id: 'My Trips',
            element: <MyTripsPage />,
          },
          {
            path: '/dashboard/my-trips/new',
            id: 'New Trip',
            element: <NewTripPage />,
          },
          {
            path: '/dashboard/my-trips/:tripId',
            id: 'View Trip Layout',
            element: <ViewTripLayout />,
            children: [
              {
                path: '/dashboard/my-trips/:tripId',
                id: 'View Trip',
                element: <ViewTripPage />,
              },
              {
                path: '/dashboard/my-trips/:tripId/status',
                id: 'View Trip Status',
                element: <ViewTripStatusPage />,
              },
              {
                path: '/dashboard/my-trips/:tripId/terminal-delivery-order',
                id: 'View Trip TDO',
                element: <ViewTripTDOPage />,
              },
              {
                path: '/dashboard/my-trips/:tripId/request-payment-for-trip',
                id: 'Request payment for trip',
                element: <ViewTripRequestPaymentPage />,
              },
              {
                path: '/dashboard/my-trips/:tripId/view-payment-request',
                id: 'View Request payment for trip',
                element: <ViewRequestForPayment />,
              },
              {
                path: '/dashboard/my-trips/:tripId/bids',
                id: 'View Trip Bids Layout',
                element: <ViewTripBidsLayout />,
                children: [
                  {
                    path: '',
                    id: 'View Trip Bids',
                    element: <ViewTripBidsPage />,
                  },
                  {
                    path: '/dashboard/my-trips/:tripId/bids/:bidId',
                    id: 'View Trip Bid',
                    element: <ViewTripBidPage />,
                  },
                  {
                    path: '/dashboard/my-trips/:tripId/bids/:bidId/checkout',
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
        path: '/dashboard/available-jobs',
        id: 'Jobs',
        element: <TransporterJobsPage />,
      },
      {
        path: '/dashboard/available-jobs/:tripId',
        id: 'Job Detail',
        element: <ViewTransporterJobDetailsPage />,
      },
      {
        path: '/dashboard/available-jobs/:tripId/bid',
        id: 'Bid on Job',
        element: <BidOnJobPage />,
      },
      {
        path: '/dashboard/payments',
        id: 'Payments',
        element: <ViewPaymentsPage />,
      },
    ],
  },
  {
    path: '/dashboard/components',
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

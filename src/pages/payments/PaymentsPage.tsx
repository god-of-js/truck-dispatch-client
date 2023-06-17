import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from 'modules/index';
import { getPaymentRequestsOfDriver } from 'modules/Payments';
import PaymentRequest from 'types/PaymentRequest';
import { DropDownData } from 'ui/UiDropdownMenu';

import {
  abbreviateNumber,
  convertToFullDate,
  convertToFullDateWithTime,
  toAnyAction,
  filterByFieldInObject,
} from 'utils/helpers';

import { serviceBasedUserTypes } from 'utils/constants';
import User from 'types/User';

const UiButton = lazy(() => import('ui/UiButton'));
const UiPill = lazy(() => import('ui/UiPill'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));
const UiTable = lazy(() => import('ui/UiTable'));
const DashboardTopNav = lazy(() => import('components/layout/DashboardTopNav'));
const ViewPaymentDetails = lazy(
  () => import('components/payment/ViewPaymentDetails'),
);

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const paymentRequests = useSelector(
    (state: RootState) => state.payment.paymentRequests,
  );
  const searchParams = new URLSearchParams(location.search);
  const user = useSelector((state: RootState) => state.account.user);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRequest>();
  const [isViewPaymentVisible, setIsViewPaymentVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalPendingPayments, setTotalPendingPayments] = useState(0);
  const [totalCompletedPayments, setTotalCompletedPayments] = useState(0);
  const status = searchParams.get('status');

  const headers = [
    {
      title: 'Payment ID',
      query: 'reference',
    },
    {
      title: 'Sender',
      query: 'from',
    },
    {
      title: 'Bid Amount',
      query: 'amount',
    },
    {
      title: 'Proof Video',
      query: 'proofVideo',
    },
    {
      title: 'Date & Time',
      query: 'createdAt',
    },
    {
      title: 'Status',
      query: 'status',
    },
  ];
  const options: DropDownData[] = [
    {
      label: 'See Trip details',
      func: goToTripDetails,
    },
  ];

  function goToTripDetails(paymentId: string) {
    const payment = paymentRequests.find(({ _id }) => _id === paymentId);

    if (payment) navigate(`/my-trips/${payment.trip._id}`);
  }

  function userDetails(tripUser?: User) {
    if (!tripUser) return 'Not yet assigned';

    return (
      <UserDetails>
        <UiAvatar avatar={tripUser.avatar} />
        <div>
          <div className="transporter-name">{`${tripUser.firstName} ${tripUser.lastName}`}</div>
          <div>{tripUser.phone}</div>
        </div>
      </UserDetails>
    );
  }

  function getVariant(status: string) {
    if (status === 'pending') return 'warning';

    if (status === 'rejected') return 'danger';

    return 'success';
  }

  const data = useMemo(() => {
    const data = status
      ? filterByFieldInObject<PaymentRequest>('status', status, paymentRequests)
      : paymentRequests;

    return data.map((item) => ({
      ...item,
      reference: `#${item.reference}`,
      from: userDetails(item.trip.tripOwner),
      createdAt: <>{convertToFullDateWithTime(item.createdAt!)}</>,
      updatedAt: <>{convertToFullDate(item.updatedAt!)}</>,
      status: (
        <UiPill variant={getVariant(item.status)} hasIcon>
          {item.status}
        </UiPill>
      ),
      amount: <AmountText>NGN {abbreviateNumber(item.amount!)}</AmountText>,
      proofVideo: (
        <UiButton variant="secondary">
          <UiIcon icon="PlayCircle" />
          <span>Proof Video</span>
        </UiButton>
      ),
    }));
  }, [paymentRequests, status]);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestsOfDriver()));
  }, []);

  const filters = useMemo(
    () => [
      {
        title: 'All',
        route: '/payments',
        value: totalPayments,
      },
      {
        title: 'Pending',
        route: '/payments?status=pending',
        value: totalPendingPayments,
      },
      {
        title: 'Completed',
        route: '/payments?status=completed',
        value: totalCompletedPayments,
      },
    ],
    [totalPayments, totalPendingPayments, totalCompletedPayments],
  );

  function handleQueryChange({
    value,
  }: {
    name: string;
    value: string | null;
  }) {
    setSearchQuery(value!);
  }

  function emptyTableBtnContent() {
    if (serviceBasedUserTypes.includes(user?.userType!)) return 'See Jobs';

    return (
      <>
        <UiIcon icon="TruckTick" />
        <span>Bid for jobs</span>
      </>
    );
  }

  function emptyTableAction() {
    navigate('/available-jobs');
  }

  return (
    <>
      <DashboardTopNav
        routeName="Payments"
        pageFilters={filters}
        handleQueryChange={handleQueryChange}
        searchQuery={searchQuery}
      />
      <PageStyling>
        <UiTable
          tableTitle="Recent Payments"
          data={data}
          headers={headers}
          options={options}
          onRowClick={goToTripDetails}
          emptyTableIcon="Moneys"
          emptyTableText="Nothing here yet. Start taking jobs to get payments."
          emptyTableBtnContent={emptyTableBtnContent()}
          emptyTableAction={emptyTableAction}
        />
        {selectedPayment && (
          <ViewPaymentDetails
            isVisible={isViewPaymentVisible}
            onClose={() => setIsViewPaymentVisible(false)}
            payment={selectedPayment}
            key={selectedPayment._id}
          />
        )}
      </PageStyling>
    </>
  );
}

const PageStyling = styled.div`
  padding: ${pxToRem(24)};
`;

const UserDetails = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  align-items: center;
  .transporter-name {
    font-weight: 400;
    font-size: ${pxToRem(14)};
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    color: var(--color-neutralBlack);
    letter-spacing: -0.02em;
    text-transform: capitalize;
    font-family: 'thiccboi-extrabold';
  }
`;

const AmountText = styled.span`
  font-weight: 700;
  font-size: ${pxToRem(20)};
`;

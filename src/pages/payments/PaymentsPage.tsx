import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ViewPaymentDetails from 'components/payment/ViewPaymentDetails';
import { RootState } from 'modules/index';
import { getPaymentRequestsOfDriver } from 'modules/Payments';
import PaymentRequest from 'types/PaymentRequest';
import { DropDownData } from 'ui/UiDropdownMenu';
import UiOverlay from 'ui/UiOverlay';
import UiPill from 'ui/UiPill';
import UiTable from 'ui/UiTable';
import {
  abbreviateNumber,
  convertToFullDate,
  convertToFullDateWithTime,
  toAnyAction,
  truncateText,
} from 'utils/helpers';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiInput from 'ui/UiInput';
import { serviceBasedUserTypes } from 'utils/constants';
import UiIcon from 'ui/UiIcon';
import UiAvatar from 'ui/UiAvatar';
import User from 'types/User';
import UiButton from 'ui/UiButton';
import { useLocation } from 'react-router-dom';
import { filterByFieldInObject } from 'utils/helpers';

function PaymentsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
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
      label: 'View Payment',
      func: showPaymentDetails,
    },
  ];

  function showPaymentDetails(id: string) {
    const req = paymentRequests.find((request) => request._id === id);
    if (!req) throw new Error('request does not exist');
    setSelectedPayment(req);
    setIsViewPaymentVisible(true);
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
      status: <UiPill variant={getVariant(item.status)}>{item.status}</UiPill>,
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
    dispatch(toAnyAction(getPaymentRequestsOfDriver())).then(
      (requests: any) => {
        setTotalPayments(requests.length);
        setTotalPendingPayments(
          requests.filter((request: any) => request.status === 'pending')
            .length,
        );
        setTotalCompletedPayments(
          requests.filter((request: any) => request.status === 'completed')
            .length,
        );
      },
    );
    // dispatch(toAnyAction(getTrips()));
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
        <span>Create new trip</span>
      </>
    );
  }

  function edgeChild() {
    return (
      <EdgeChild>
        <UiInput
          onChange={handleQueryChange}
          value={searchQuery}
          name="searchQuery"
          placeholder="Search..."
          icon="Search"
          size="md"
        />
      </EdgeChild>
    );
  }

  return (
    <>
      <DashboardTopNav
        routeName="Payments"
        pageFilters={filters}
        edgeNode={edgeChild()}
      />
      <PageStyling>
        <UiTable
          tableTitle="Recent Payments"
          data={data}
          headers={headers}
          options={options}
          onRowClick={showPaymentDetails}
          emptyTableIcon="Moneys"
          emptyTableText="Nothing here yet. Start taking jobs to get payments."
          emptyTableBtnContent={emptyTableBtnContent()}
        />
        <UiOverlay isVisible={isViewPaymentVisible}>
          {selectedPayment && (
            <ViewPaymentDetails
              onClose={() => setIsViewPaymentVisible(false)}
              payment={selectedPayment}
              key={selectedPayment._id}
            />
          )}
        </UiOverlay>
      </PageStyling>
    </>
  );
}

const PageStyling = styled.div`
  padding: ${pxToRem(24)};
`;

const EdgeChild = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  .ui-filter-tag {
    cursor: pointer;
  }
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
  font-family: thiccboi-bold;
  font-weight: 700;
  font-size: 20px;
`;

export default PaymentsPage;

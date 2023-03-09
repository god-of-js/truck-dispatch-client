import { RootState } from 'modules/index';
import { getPaymentRequestsOfDriver } from 'modules/Payments';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import UiPill from 'ui/UiPill';
import UiTable from 'ui/UiTable';
import { toAnyAction } from 'utils/helpers';

const headers = [
  {
    title: 'Date',
    query: 'createdAt',
  },
  {
    title: 'Trip Reference',
    query: 'tripId',
  },
  {
    title: 'Amount',
    query: 'amount',
  },
  {
    title: 'Status',
    query: 'status',
  },
  {
    title: 'Reference',
    query: 'reference',
  },
];

function ViewPaymentsPage() {
  const dispatch = useDispatch();
  const paymentRequests = useSelector(
    (state: RootState) => state.payment.paymentRequests,
  );

  function getVariant(status: string) {
    if (status === 'pending') return 'warning';

    if (status === 'rejected') return 'danger';

    return 'success'
  }

  const data = useMemo(() => {
    return paymentRequests.map((item) => ({
      ...item,
      status: <UiPill variant={getVariant(item.status)}>{item.status}</UiPill>,
    }));
  }, [paymentRequests]);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestsOfDriver()));
  });
  return (
    <PageStyling>
      <UiTable
        tableTitle="Recent Payments"
        data={data}
        headers={headers}
        options={[]}
      />
    </PageStyling>
  );
}

const PageStyling = styled.div`
  padding: ${pxToRem(24)};
`;

export default ViewPaymentsPage;

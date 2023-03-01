import React from 'react';
import styled from 'styled-components';
import UiTable from 'ui/UiTable';

const headers = [
  {
    title: 'ID',
    query: 'id',
  },
  {
    title: 'Amount',
    query: 'amount',
  },
  {
    title: 'Date',
    query: 'date',
  },
  {
    title: 'Status',
    query: 'status',
  },
];
enum StatusEnum {
  PENDING = 'pending',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}
const data = [
  {
    id: '63d2bd5c16fac53d4e24a8fb',
    date: '30-Oct-2020',
    amount: '250000',
    status: 'Rejected',
  },
  {
    id: '23d2bd5c16fac53d4e24a8fb',
    date: '15-Oct-2020',
    amount: '150000',

    status: 'Pending',
  },
  {
    id: '73d2bd5c16fac53d4e24a8fb',
    date: '12-Oct-2020',
    amount: '5000',
    status: 'Completed',
  },
];

function ViewPaymentsPage() {
  return (
    <PageStyling>
      <UiTable
        tableTitle={'Payments'}
        data={data.map((payment) => {
          return {
            ...payment,
            amount: Number(payment.amount).toLocaleString(),
            status: <Status status={payment.status}>{payment.status}</Status>,
          };
        })}
        headers={headers}
        options={[]}
      />
    </PageStyling>
  );
}

const PageStyling = styled.div`
  padding: ${pxToRem(24)};
`;

const Status = styled.div<{ status: string }>`
  color: ${({ status }) =>
    status.toLowerCase() == StatusEnum.PENDING
      ? '#FCA800'
      : status.toLowerCase() === StatusEnum.REJECTED
      ? '#ff5252'
      : 'green'};
`;

export default ViewPaymentsPage;

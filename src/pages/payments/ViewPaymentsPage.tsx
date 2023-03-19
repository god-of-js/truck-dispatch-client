import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Logo from '../../assets/img/truck-dispatch-logo-with-text.png';
import ViewPaymentDetails from 'components/payment/ViewPaymentDetails';
import { RootState } from 'modules/index';
import { getPaymentRequestsOfDriver } from 'modules/Payments';
import { getTransporterTrips } from 'modules/Trips';
import PaymentRequest from 'types/PaymentRequest';
import { DropDownData } from 'ui/UiDropdownMenu';
import UiOverlay from 'ui/UiOverlay';
import UiPill from 'ui/UiPill';
import UiTable from 'ui/UiTable';
import { abbreviateNumber, convertDate, toAnyAction } from 'utils/helpers';

function ViewPaymentsPage() {
  const dispatch = useDispatch();
  const paymentRequests = useSelector(
    (state: RootState) => state.payment.paymentRequests,
  );
  const [selectedPayment, setSelectedPayment] = useState<PaymentRequest>();
  const [isViewPaymentVisible, setIsViewPaymentVisible] = useState(false);
  const headers = [
    {
      title: 'Created',
      query: 'createdAt',
    },
    {
      title: 'Last Updated',
      query: 'updatedAt',
    },
    {
      title: 'Trip Reference',
      query: 'tripReference',
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
  const options: DropDownData[] = [
    {
      label: 'View Payment',
      func: showPaymentDetails,
    },
  ];

  function showPaymentDetails(id: string) {
    const req = paymentRequests.find((request) => request.id === id);
    if (!req) throw new Error('request does not exist');
    setSelectedPayment(req);
    setIsViewPaymentVisible(true);
  }

  function getVariant(status: string) {
    if (status === 'pending') return 'warning';

    if (status === 'rejected') return 'danger';

    return 'success';
  }

  const data = useMemo(() => {
    return paymentRequests.map((item) => ({
      ...item,
      createdAt: <>{convertDate(item.createdAt!)}</>,
      updatedAt: <>{convertDate(item.updatedAt!)}</>,
      status: <UiPill variant={getVariant(item.status)}>{item.status}</UiPill>,
      amount: <>NGN {abbreviateNumber(item.amount!)}</>,
    }));
  }, [paymentRequests]);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestsOfDriver()));
    dispatch(toAnyAction(getTransporterTrips()));
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payments - TruckDispatch</title>
        <link rel="canonical" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <PageStyling>
        <UiTable
          tableTitle="Recent Payments"
          data={data}
          headers={headers}
          options={options}
          onRowClick={showPaymentDetails}
        />
        <UiOverlay isVisible={isViewPaymentVisible}>
          {selectedPayment && (
            <ViewPaymentDetails
              onClose={() => setIsViewPaymentVisible(false)}
              payment={selectedPayment}
              key={selectedPayment.id}
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

export default ViewPaymentsPage;

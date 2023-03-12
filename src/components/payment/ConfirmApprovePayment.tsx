import { requestPaymentByTransporter } from 'modules/Payments';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiButton from 'ui/UiButton';

import UiModal from 'ui/UiModal';
import { nairaToKobo, toAnyAction } from 'utils/helpers';
import { Toast } from 'utils/toast';
import { makeTransfer } from '../../api/paystackIntegrations';

interface Props {
  onClose: () => void;
  paymentRequest?: PaymentRequest | null;
  setPaymentRequest: (param: PaymentRequest) => void;
}
export default function ConfirmApprovePayment({
  paymentRequest,
  onClose,
  setPaymentRequest
}: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function setStatusOfPaymentToComplete(paymentDetails: PaymentRequest) {
    return dispatch(
      toAnyAction(
        requestPaymentByTransporter({
          ...paymentDetails,
          status: 'completed',
          updatedAt: Date.now(),
        }),
      ),
    ).then(() => {
      setPaymentRequest({
        ...paymentDetails,
        status: 'completed',
        updatedAt: Date.now(),
      })
      Toast.success({
        msg: 'Payment request has been approved.',
      });
      onClose();
    });
  }

  function getTransferData(paymentDetails: PaymentRequest) {
    return {
      source: 'balance',
      reason: `TruckDispatch trip-${paymentRequest?.tripReference} payment-${paymentRequest?.reference}`,
      reference: paymentDetails.paymentReference!,
      recipient: paymentDetails.paystackRecipient,
      amount: nairaToKobo(paymentDetails.amount!),
    };
  }

  function approvePayment() {
    if (!paymentRequest) throw new Error('Payment request was not provided');
    setLoading(true);
    const transferData = getTransferData(paymentRequest);

    makeTransfer(transferData)
      .then(() => setStatusOfPaymentToComplete(paymentRequest))
      .catch((err) => {
        if (
          err.response.data.message ===
          'Please provide a unique reference. Reference already exists on a transfer'
        ) {
          Toast.error({ msg: 'Payment has already been issued.' });
          return;
        }

        Toast.error({ msg: err.response.data.message });
      })
      .finally(() => setLoading(false));
  }

  return (
    <UiModal size="sm" onClose={onClose}>
      <ApprovePaymentStyling>
        <h2>Approve Payment</h2>
        <p>
          <b>Are you sure?</b> Once you approve payment, payment is
          automatically tendered to the transporter. This process cannot be
          reverted.
        </p>
        <div className="btn-container">
          <UiButton variant="neutral" isFullWidth onClick={() => onClose()}>
            Cancel
          </UiButton>
          <UiButton isFullWidth loading={loading} onClick={approvePayment}>
            Approve Payment
          </UiButton>
        </div>
      </ApprovePaymentStyling>
    </UiModal>
  );
}

const ApprovePaymentStyling = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    margin: 0;
  }
  p {
    width: 80%;
  }

  .btn-container {
    display: flex;
    width: 80%;
    margin-top: ${pxToRem(12)};
    gap: ${pxToRem(12)};
  }
`;

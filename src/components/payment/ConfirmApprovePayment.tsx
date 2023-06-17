import React, { lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';

import { approvePaymentRequest } from 'modules/Trips';

const UiButton = lazy(() => import('ui/UiButton'));
const UiModal = lazy(() => import('ui/UiModal'));

interface Props {
  onClose: () => void;
  tripId: string;
  paymentRequestId: string;
  isVisible: boolean;
}
export default function ConfirmApprovePayment({
  tripId,
  paymentRequestId,
  onClose,
  isVisible,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function approvePayment() {
    setLoading(true);
    dispatch(toAnyAction(approvePaymentRequest(tripId, paymentRequestId)))
      .then(() => {
        navigate(`/my-trips/${tripId}/status`);
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <UiModal isVisible={isVisible} size="sm" onClose={onClose}>
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

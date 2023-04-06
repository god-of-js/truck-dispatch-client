import { rejectPaymentRequest } from 'modules/Payments';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiModal from 'ui/UiModal';
import UiTextArea from 'ui/UiTextArea';
import { toAnyAction } from 'utils/helpers';
import RejectPaymentSchema from 'utils/validations/RejectPaymentSchema';

interface Props {
  onClose: () => void;
  paymentRequest?: PaymentRequest | null;
  tripId: string;
  paymentRequestId: string;
}
export default function RejectPaymentWithReason({
  paymentRequest,
  tripId,
  paymentRequestId,
  onClose,
}: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    reasonForReject: '',
  });

  function rejectPayment() {
    if (!paymentRequest) throw new Error('payment request does not exist');
    setLoading(true);
    dispatch(
      toAnyAction(rejectPaymentRequest(tripId, paymentRequestId, formData)),
    )
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <UiModal onClose={onClose}>
      <h2>Reject Payment</h2>
      <p>
        Inform the transporter of the reason his request for payment was
        declined. When the transporter corrects his request, you can proceed
        with the payment by clicking the "Approve Payment" button.
      </p>
      <UiForm
        formData={formData}
        schema={RejectPaymentSchema}
        onSubmit={rejectPayment}
      >
        {({ errors }) => (
          <>
            <UiTextArea
              value={formData.reasonForReject}
              name="reasonForReject"
              label="Reason for Rejection"
              error={errors.reasonForReject}
              onChange={({ value }) => setFormData({ reasonForReject: value })}
            />
            <ButtonContainer>
              <UiButton variant="secondary" type="button" onClick={onClose}>
                Cancel Reject
              </UiButton>
              <UiButton variant="danger" loading={loading}>
                Reject Payment
              </UiButton>
            </ButtonContainer>
          </>
        )}
      </UiForm>
    </UiModal>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  justify-content: flex-end;
  margin-top: ${pxToRem(16)};
`;

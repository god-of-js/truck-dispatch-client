import { rejectPaymentRequest } from 'modules/Trips';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiModal from 'ui/UiModal';
import UiTextArea from 'ui/UiTextArea';
import { toAnyAction } from 'utils/helpers';
import RejectPaymentSchema from 'utils/validations/RejectPaymentSchema';

interface Props {
  isVisible: boolean;
  tripId: string;
  paymentRequestId: string;
  onClose: () => void;
}
export default function RejectPaymentRequest({
  isVisible,
  tripId,
  paymentRequestId,
  onClose,
}: Props) {
  const [formData, setFormData] = useState({ reasonForReject: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function onChange({ value }: { value: string }) {
    setFormData({ reasonForReject: value });
  }

  function rejectPayment() {
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
    <UiModal title="Reject Payment" isVisible={isVisible} onClose={onClose}>
      <UiForm
        formData={formData}
        schema={RejectPaymentSchema}
        onSubmit={rejectPayment}
      >
        {({ errors }) => (
          <ModalBody>
            <UiTextArea
              value={formData.reasonForReject}
              name="reasonForReject"
              label="Reason for rejecting payment?"
              error={errors.reasonForReject}
              onChange={onChange}
            />
            <div className="button-container">
              <UiButton variant="primary" size="large" loading={loading}>
                Reject Payment
              </UiButton>
            </div>
          </ModalBody>
        )}
      </UiForm>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding:24px 64px;
  padding-bottom: 0;
  font-style: normal;
  font-weight: 400;
  font-size:16px;
  line-height:24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:24px;

  textarea {
    height:400px;
  }
  .button-container {
    display: flex;
    gap:8px;
    justify-content: center;

    button {
      min-width:180px;
    }
  }
`;

import { useMemo } from 'react';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiButton from 'ui/UiButton';
import UiCard from 'ui/UiCard';
import UiIcon from 'ui/UiIcon';

interface Props {
  isClient: boolean;
  payment?: PaymentRequest;
}
export default function TripDetailPaymentCard({ isClient, payment }: Props) {
  const showRequestPayment = useMemo(() => {
    return !isClient && !payment;
  }, [isClient, payment]);
  const requestIsPending = useMemo(() => {
    return !isClient && payment?.status === 'pending';
  }, [isClient, payment]);

  return (
    <UiCard>
      <PaymentCard>
        <div className="card-title">Payment</div>
        <div className="no-payment-made">
          No payment has been made yet by the shipper
        </div>
        <BottomContainer>
          {showRequestPayment && (
            <UiButton isFullWidth>Request Payment</UiButton>
          )}
          {requestIsPending && (
            <UiButton disabled variant="warning-secondary">
              <UiIcon icon="Information" />
              Payment Pending
            </UiButton>
          )}
          {!!payment && (
            <UiButton variant="secondary">
              <UiIcon icon="PlayCircle" /> <span>Loading Proof</span>
            </UiButton>
          )}
        </BottomContainer>
      </PaymentCard>
    </UiCard>
  );
}

const PaymentCard = styled.div`
  position: relative;
  height: 100%;
`;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${pxToRem(8)};
  width: 100%;

  button {
    width: 100%;
  }
`;

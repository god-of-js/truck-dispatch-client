import { useMemo } from 'react';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiButton from 'ui/UiButton';
import UiCard from 'ui/UiCard';
import UiIcon from 'ui/UiIcon';
import { abbreviateNumber } from 'utils/helpers';

interface Props {
  isClient: boolean;
  payment?: PaymentRequest;
  requestPayment: () => void;
}
export default function TripDetailPaymentCard({
  isClient,
  payment,
  requestPayment,
}: Props) {
  const showRequestPayment = useMemo(() => {
    return !isClient && !payment;
  }, [isClient, payment]);

  const requestIsPending = useMemo(() => {
    return !isClient && payment?.status === 'pending';
  }, [isClient, payment]);

  const approvePaymentIsVisible = useMemo(() => {
    if (!isClient || payment?.status === 'completed') return false;

    return true;
  }, [isClient, payment]);

  const loadingProofIsVisible = useMemo(() => {
    return isClient || !!payment;
  }, [isClient, payment]);

  return (
    <UiCard>
      <PaymentCard>
        <div className="card-title">Payment</div>
        {!payment ? (
          <div className="description-text">
            {isClient
              ? "Transporter hasn't requested for payment"
              : 'No payment has been authorized by the shipper. Request payment to enable the shipper authorize your payment'}
          </div>
        ) : (
          <div className="price-container">
            <span className="amount">
              &#8358; {abbreviateNumber(payment.amount)}
            </span>
          </div>
        )}

        <BottomContainer>
          {showRequestPayment && (
            <UiButton isFullWidth onClick={requestPayment}>
              Request Payment
            </UiButton>
          )}
          {requestIsPending && (
            <UiButton disabled variant="warning-secondary">
              <UiIcon icon="Information" />
              Payment Pending
            </UiButton>
          )}
          {approvePaymentIsVisible && (
            <UiButton disabled={!payment}>Approve Payment</UiButton>
          )}
          {loadingProofIsVisible && (
            <UiButton variant="secondary" disabled={!payment}>
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

  .price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .amount {
      font-style: normal;
      font-weight: 700;
      font-size: ${pxToRem(32)};
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
    }
  }
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

import { useMemo } from 'react';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiButton from 'ui/UiButton';
import UiCard from 'ui/UiCard';
import UiIcon, { Icons } from 'ui/UiIcon';
import { abbreviateNumber, convertToFullDate, getTime } from 'utils/helpers';

interface Props {
  isClient: boolean;
  payment?: PaymentRequest;
  requestPayment: () => void;
  approvePayment: () => void;
  viewLoadingProof: () => void;
  showReasonForReject: () => void;
}
export default function TripDetailPaymentCard({
  isClient,
  payment,
  requestPayment,
  viewLoadingProof,
  showReasonForReject,
  approvePayment,
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

  const paymentWasRejectedIsVisible = useMemo(() => {
    return !isClient && payment?.status === 'rejected';
  }, [isClient, payment]);
  const statusIconDetails: { icon: Icons; className: string } = useMemo(() => {
    if (!payment) return {} as { icon: Icons; className: string };

    if (payment.status === 'completed') {
      return {
        icon: 'CheckCircle',
        className: 'completed',
      };
    }

    if (payment.status === 'rejected') {
      return {
        icon: 'CloseCircle',
        className: 'rejected',
      };
    }

    return {
      icon: 'Information',
      className: 'pending',
    };
  }, [payment?.status]);

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
            <div className="time-with-icon">
              <div>
                <div>{convertToFullDate(payment.createdAt!)}</div>
                <div>{getTime(payment.createdAt!)}</div>
              </div>
              <div className={`icon-container ${statusIconDetails.className}`}>
                <UiIcon icon={statusIconDetails.icon} size="16" />
              </div>
            </div>
          </div>
        )}

        <BottomContainer>
          {showRequestPayment && (
            <UiButton isFullWidth onClick={requestPayment}>
              Request Payment
            </UiButton>
          )}
          {payment?.status === 'completed' && (
            <UiButton disabled variant="success-secondary">
              <UiIcon icon="CheckCircle" />
              Completed
            </UiButton>
          )}
          {requestIsPending && (
            <UiButton disabled variant="warning-secondary">
              <UiIcon icon="Information" />
              Payment Pending
            </UiButton>
          )}
          {approvePaymentIsVisible && (
            <UiButton disabled={!payment} onClick={approvePayment}>
              Approve Payment
            </UiButton>
          )}
          {paymentWasRejectedIsVisible && (
            <UiButton variant="danger-secondary" onClick={showReasonForReject}>
              <div className="request-rejected">
                <span>Request rejected</span>
                <div className="icon-container">
                  <UiIcon icon="CaretDownBold" size="10" />
                </div>
              </div>
            </UiButton>
          )}
          {loadingProofIsVisible && (
            <UiButton
              variant="secondary"
              onClick={viewLoadingProof}
              disabled={!payment}
            >
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

    .time-with-icon {
      display: flex;
      font-weight: 400;
      font-size: ${pxToRem(12)};
      line-height: ${pxToRem(16)};
      gap: ${pxToRem(16)};
      text-align: right;
      color: var(--color-neutralBlack);

      .icon-container {
        width: ${pxToRem(36)};
        height: ${pxToRem(36)};
        border-radius: ${pxToRem(36)};
        display: flex;
        align-items: center;
        justify-content: center;

        &.pending {
          background: var(--color-warning-10);

          svg {
            fill: var(--color-warning);
          }
        }
        &.rejected {
          background: var(--color-danger-10);

          svg {
            fill: var(--color-danger);
          }
        }
        &.completed {
          background: var(--color-success-10);

          svg {
            fill: var(--color-success);
          }
        }
      }
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

  .request-rejected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .icon-container {
      background: var(--color-danger);
      min-width: ${pxToRem(46)};
      height: ${pxToRem(28)};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${pxToRem(6)};

      svg {
        fill: white;
      }
    }
  }
`;

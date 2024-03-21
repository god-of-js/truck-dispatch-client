import { lazy, useMemo } from 'react';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import PaymentRequestStatus from 'types/enums/PaymentRequestStatus';
import { Icons } from 'ui/UiIcon';
import { abbreviateNumber, convertToFullDate, getTime } from 'utils/helpers';

const UiButton = lazy(() => import('ui/UiButton'));
const UiCard = lazy(() => import('ui/UiCard'));
const UiIcon = lazy(() => import('ui/UiIcon'));

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
    return !isClient && payment?.status === PaymentRequestStatus.PENDING;
  }, [isClient, payment]);

  const approvePaymentIsVisible = useMemo(() => {
    return !isClient || payment?.status !== PaymentRequestStatus.COMPLETED
  }, [isClient, payment]);

  const loadingProofIsVisible = useMemo(() => {
    return isClient || !!payment;
  }, [isClient, payment]);

  const paymentWasRejectedIsVisible = useMemo(() => {
    return !isClient && payment?.status === PaymentRequestStatus.REJECTED;
  }, [isClient, payment]);

  const statusIconDetails: { icon: Icons; className: string } = useMemo(() => {
    if (!payment) return {} as { icon: Icons; className: string };

    if (payment.status === PaymentRequestStatus.COMPLETED) {
      return {
        icon: 'CheckCircle',
        className: 'completed',
      };
    }

    if (payment.status === PaymentRequestStatus.REJECTED) {
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
          {payment?.status === PaymentRequestStatus.COMPLETED && (
            <UiButton disabled variant="success-secondary">
              <UiIcon icon="CheckCircle" />
              Payment Completed
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
  min-height: ${pxToRem(180)};
  justify-content: space-between;
  display: flex;
  flex-direction: column;

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
  display: flex;
  gap: ${pxToRem(16)};
  justify-content: space-between;
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

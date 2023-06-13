import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import Bid from 'types/Bid';
import UiButton from 'ui/UiButton';
import UiAlert from 'ui/UiAlert';
import UiModal from 'ui/UiModal';
import {
  abbreviateNumber,
  formatUserType,
  nairaToKobo,
  priceWithTDPercent,
  tdPercentageWithVAT,
} from 'utils/helpers';
import { paystackPublickKey } from 'utils/privateKeys';
import Payment from 'types/Payment';
import { selectTrip } from 'modules/Trips';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';
import UiCard from 'ui/UiCard';
import { ReactComponent as AppLogo } from '../../assets/logo.svg';
import { ReactComponent as PaystackLogo } from '../../assets/img/paystack.svg';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';
import UserDetails from 'ui/UserDetails';
import ATMCard from './ATMCard';
import UiCheckbox from 'ui/UiCheckbox';
import PaymentMethods from 'types/PaymentMethods';

interface Props {
  bid: Bid;
  isVisible: boolean;
  loading: boolean;
  payWithBalance: () => void;
  payWithPaystack: (paymentdetails?: Payment) => void;
  onClose: () => void;
}
export default function MakePayment({
  bid,
  isVisible,
  loading,
  payWithBalance,
  payWithPaystack,
  onClose,
}: Props) {
  // When there are more payment cases, refactor this to handle them.
  const { tripId } = useParams();
  const trip = useSelector(selectTrip(tripId!));

  const user = useSelector((state: RootState) => state.account.user);

  const paystackConfig = {
    email: user?.email || '',
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    amount: Math.round(nairaToKobo(priceWithTDPercent(bid.price))),
    publicKey: paystackPublickKey,
  };

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    user?.balance! >= bid.price ? 'balance' : 'paystack',
  );

  const isBalanceSufficient = useMemo(() => {
    return user?.balance! >= bid.price;
  }, [user?.balance, bid.price]);

  function setPaymentMethodAsBalance() {
    if (!isBalanceSufficient) return;
    setPaymentMethod('balance');
  }

  function setPaymentMethodAsPaystack() {
    setPaymentMethod('paystack');
  }

  function proceedAfterPaystack(processorDetails?: Payment) {
    payWithPaystack(processorDetails);
  }

  function proceedWithPayment() {
    if (paymentMethod === 'balance') {
      payWithBalance();
      return;
    }
    initializePayment(proceedAfterPaystack);
  }
  const initializePayment = usePaystackPayment(paystackConfig);

  return (
    <UiModal
      isVisible={isVisible}
      position="right"
      title="Make Payment"
      onClose={onClose}
    >
      <ModalBody isBalanceEnough={isBalanceSufficient}>
        <UiButton variant="secondary" onClick={onClose}>
          <UiIcon icon="ArrowLeft" /> Back to Transporter Bids
        </UiButton>
        <div className="modal-body__inner">
          <div className="grid-item">
            <div className="h-fit-content">
              <UiCard variant="primary-light">
                <div className="logo-container">
                  <AppLogo />
                  <span>TruckDispatch</span>
                </div>
                <div className="thanks-for-trusting-us">
                  <h3>
                    Thanks for trusting us to handle your dispatch{' '}
                    {`${user?.firstName}`} 😀
                  </h3>
                  <p>We wish you a safe trucking run</p>
                </div>
              </UiCard>
            </div>
            <div className="h-fit-content">
              <UiCard variant="primary-light">
                <h3 className="card-title border-bottom">Trip Details</h3>
                <div className="border-bottom">
                  <TripPickupAndDropOff
                    variant="gray"
                    pickup={trip?.pickUpAddress!}
                    dropOff={trip?.deliveryAddress!}
                  />
                </div>
                <UserDetails
                  size="sm"
                  showViewProfile
                  userName={`${bid.transporter.firstName} ${bid.transporter.lastName}`}
                  avatar={bid.transporter.avatar}
                  profileSubtitle={formatUserType(bid.transporter.userType)}
                />
              </UiCard>
            </div>
            <div className="h-fit-content">
              <UiCard variant="primary-light">
                <h3 className="card-title border-bottom">Receipt</h3>
                <div className="border-bottom price-fields">
                  <div className="price-field">
                    <span className="price-title">Base Fare</span>
                    <span className="price-value">&#8358; {bid.price}</span>
                  </div>
                  <div className="price-field">
                    <span className="price-title">Agent Fee</span>
                    <span className="price-value">
                      &#8358; {abbreviateNumber(tdPercentageWithVAT(bid.price))}
                    </span>
                  </div>
                </div>
                <div className="total-field">
                  <span>Total</span>
                  <span>
                    &#8358; {abbreviateNumber(priceWithTDPercent(bid.price))}
                  </span>
                </div>
              </UiCard>
            </div>
          </div>
          <div className="grid-item">
            <div
              className="h-fit-content cursor-pointer"
              onClick={setPaymentMethodAsBalance}
            >
              <UiCard variant="primary-light">
                <div className="pay-with-balance-header payment-method">
                  <div className="icon-with-title">
                    <UiIcon icon="Card" size="20" />
                    <span>Pay with balance</span>
                  </div>
                  <UiCheckbox
                    value={paymentMethod === 'balance'}
                    onChange={setPaymentMethodAsBalance}
                  />
                </div>
                <div className="atmCard">
                  <ATMCard isActive={isBalanceSufficient} />
                </div>

                {user?.balance! < bid.price && (
                  <div className="alert-notification">
                    <UiAlert
                      variant="gray"
                      icon={<UiIcon icon="Information" size="17" />}
                    >
                      <span className="alert-warning">
                        <span className="alert-header">
                          Insufficient Balance
                        </span>{' '}
                        <span className="alert-message">
                          You can add funds to your balance by utilizing the
                          wallet section and making a deposit.
                        </span>
                      </span>
                    </UiAlert>
                  </div>
                )}
              </UiCard>
            </div>
            <div
              className="h-fit-content cursor-pointer"
              onClick={setPaymentMethodAsPaystack}
            >
              <UiCard variant="primary-light">
                <div className="payment-method">
                  <div className="icon-with-title">
                    <PaystackLogo />
                    <span>Paystack</span>
                  </div>
                  <UiCheckbox
                    value={paymentMethod === 'paystack'}
                    onChange={setPaymentMethodAsPaystack}
                  />
                </div>
              </UiCard>
            </div>
          </div>
          <div className="btn-container">
            <UiButton
              loading={loading}
              isFullWidth
              onClick={proceedWithPayment}
            >
              Proceed
            </UiButton>
          </div>
        </div>
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div<{ isBalanceEnough: boolean }>`
  padding: ${pxToRem(26)} ${pxToRem(24)};

  svg {
    fill: var(--color-danger);
  }

  .modal-body__inner {
    margin-top: ${pxToRem(48)};
    display: grid;
    gap: ${pxToRem(16)};

    .grid-item {
      display: grid;
      gap: ${pxToRem(16)};
      align-content: flex-start;
    }
    .h-fit-content {
      height: fit-content;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: ${pxToRem(8)};
      font-style: normal;
      font-weight: 700;
      font-size: ${pxToRem(16)};
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      margin-bottom: ${pxToRem(22)};
    }
    .thanks-for-trusting-us {
      h3 {
        font-style: normal;
        font-weight: 700;
        font-size: ${pxToRem(18)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
      }
      p {
        font-weight: 400;
        font-size: ${pxToRem(14)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-neutralBlack);
      }
    }
    .card-title {
      font-style: normal;
      font-weight: 700;
      font-size: ${pxToRem(20)};
      line-height: 140%;
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      margin: 0;
    }
    .border-bottom {
      border-bottom: 1px solid var(--color-gray-50);
      padding-bottom: ${pxToRem(16)};
      margin-bottom: ${pxToRem(24)};
    }
    .price-fields {
      display: grid;
      gap: ${pxToRem(16)};
      .price-field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-style: normal;
        font-weight: 400;
        font-size: ${pxToRem(14)};
        line-height: ${pxToRem(18)};
        letter-spacing: -0.02em;
        color: var(--color-gray-80);

        .price-value {
          font-size: ${pxToRem(16)};
        }
      }
    }
    .total-field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      font-size: ${pxToRem(16)};
      line-height: ${pxToRem(18)};
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
    }

    .btn-container {
      margin-top: ${pxToRem(24)};
    }

    .atmCard {
      margin-bottom: ${pxToRem(10)};
    }

    .alert-warning {
      display: flex;
      flex-direction: column;
      font-style: normal;
      font-size: ${pxToRem(14)};
      line-height: ${pxToRem(16)};
      gap: ${pxToRem(4)};
      .alert-header {
        font-weight: 700;
        color: var(--color-danger);
      }

      .alert-message {
        font-weight: 300;
        color: var(--color-gray-70);
        line-height: ${pxToRem(16)};
      }
    }

    .pay-with-balance-header {
      margin-bottom: ${pxToRem(16)};

      svg {
        fill: ${(props) =>
          props.isBalanceEnough
            ? 'var(--color-primary)'
            : 'var(--color-primary-30)'};
      }
    }
    .payment-method {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon-with-title {
        display: flex;
        align-items: center;
        gap: ${pxToRem(12)};
        font-weight: 500;
        font-size: ${pxToRem(14)};
        line-height: ${pxToRem(18)};
        color: #171520;
      }
    }

    .cursor-pointer {
      cursor: pointer;
    }
    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

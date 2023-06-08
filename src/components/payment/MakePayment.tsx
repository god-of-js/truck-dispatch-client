import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import Bid from 'types/Bid';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';
import {
  abbreviateNumber,
  formatUserType,
  nairaToKobo,
  priceWithTDPercent,
  tdPercentageWithVAT,
  toAnyAction,
} from 'utils/helpers';
import { paystackPublickKey } from 'utils/privateKeys';
import Payment from 'types/Payment';
import { assignTrip, selectTrip } from 'modules/Trips';
import { Toast } from 'utils/toast';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';
import UiCard from 'ui/UiCard';
import { ReactComponent as AppLogo } from '../../assets/logo.svg';
import { ReactComponent as PaystackLogo } from '../../assets/img/paystack.svg';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';
import UserDetails from 'ui/UserDetails';
import ATMCard from './ATMCard';
import UiCheckbox from 'ui/UiCheckbox';

interface Props {
  bid: Bid;
  onClose: () => void;
}
export default function MakePayment({ bid, onClose }: Props) {
  const { tripId } = useParams();
  const trip = useSelector(selectTrip(tripId!));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  const [loading, setLoading] = useState(false);
  const paystackConfig = {
    email: user?.email || '',
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    amount: nairaToKobo(priceWithTDPercent(bid?.price || 0)),
    publicKey: paystackPublickKey,
  };
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'balance'>(
    'balance',
  );
  function onSuccess(payment?: Payment) {
    if (!bid || !trip || !payment || !user) {
      Toast.error({ msg: 'User or Trip does not exist' });
      return;
    }
    setLoading(true);
    const paymentData = {
      from: user._id,
      to: bid.transporter._id,
      tripId: trip._id,
      bidId: bid._id,
      paymentReference: payment.reference,
      amountInBid: bid?.price,
      totalAmountPaid: priceWithTDPercent(bid?.price),
      transaction: payment.transaction,
    };

    dispatch(toAnyAction(assignTrip(paymentData)))
      .then(() => {
        navigate(`/my-trips/${tripId}`);
      })
      .finally(() => setLoading(false));
  }

  const payWithBalanceIsPossible = useMemo(() => {
    if (paymentMethod === 'balance') return true;
  }, [user?.balance, paymentMethod]);

  function setPaymentMethodAsBalance() {
    setPaymentMethod('balance');
  }
  function setPaymentMethodAsPaystack() {
    setPaymentMethod('paystack');
  }
  const initializePayment = usePaystackPayment(paystackConfig);
  return (
    <UiModal position="right" title="Make Payment" onClose={onClose}>
      <ModalBody>
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
                <ATMCard />
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
              onClick={() => initializePayment(onSuccess)}
            >
              Proceed
            </UiButton>
          </div>
        </div>
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding: ${pxToRem(26)} ${pxToRem(24)};

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

    .pay-with-balance-header {
      margin-bottom: ${pxToRem(16)};

      svg {
        fill: var(--color-primary);
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

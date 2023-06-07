import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules/index';
import Bid from 'types/Bid';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';
import { nairaToKobo, priceWithTDPercent, toAnyAction } from 'utils/helpers';
import { paystackPublickKey } from 'utils/privateKeys';
import Payment from 'types/Payment';
import { assignTrip, selectTrip } from 'modules/Trips';
import { Toast } from 'utils/toast';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';
import UiCard from 'ui/UiCard';
import { ReactComponent as AppLogo } from '../../assets/logo.svg';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';

interface Props {
  bid: Bid;
  back: () => void;

  onClose: () => void;
}
export default function MakePayment({ bid, back, onClose }: Props) {
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
                    {`${user?.firstName} ${user?.lastName}`} 😀
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
              </UiCard>
            </div>
            <div className="h-fit-content">
              <UiCard variant="primary-light"></UiCard>
            </div>
          </div>
          <div className="grid-item">
            <div className="h-fit-content">
              <UiCard variant="primary-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                ducimus aliquam quia deleniti mollitia aspernatur quisquam quasi
                alias corporis amet esse nam blanditiis doloribus? Vitae, nobis.
                Nostrum quis ea at?
              </UiCard>
            </div>
            <div className="h-fit-content">
              <UiCard variant="primary-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus, expedita? Esse velit dignissimos, sunt aspernatur rem
                asperiores suscipit ea nihil ipsa amet dolorum sit odio vitae
                cupiditate labore? Enim, suscipit.
              </UiCard>
            </div>
          </div>
          <UiButton
            loading={loading}
            isFullWidth
            onClick={() => initializePayment(onSuccess)}
          >
            Proceed
          </UiButton>
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
        font-size: ${pxToRem(20)};
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
    .trip-details {
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
    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

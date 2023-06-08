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

interface Props {
  bid: Bid;
  isVisible: boolean,
  onClose: () => void;
}
export default function MakePayment({ bid, isVisible, onClose }: Props) {
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
    <UiModal isVisible={isVisible} title="Make Payment" onClose={onClose}>
      <ModalBody>
        <UiButton
          loading={loading}
          onClick={() => initializePayment(onSuccess)}
        >
          Complete Payment
        </UiButton>
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding: ${pxToRem(26)} ${pxToRem(24)};
`;

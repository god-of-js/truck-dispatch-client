import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { selectTrip, getTrips } from 'modules/Trips';
import { createOrUpdateBid, selectBid } from 'modules/Bid';
import sizes from 'utils/sizes';
import { paystackPublickKey } from 'utils/privateKeys';
import {
  abbreviateNumber,
  nairaToKobo,
  priceWithTDPercent,
  tdPercentage,
  toAnyAction,
} from 'utils/helpers';

import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import { RootState } from 'modules/index';
import TripPickupAndDropOff from 'components/trips/TripPickupAndDropOff';
import UiAvatar from 'ui/UiAvatar';
import Payment from 'types/Payment';
import { createOrUpdatePayment } from 'modules/Payments';
import { Toast } from 'utils/toast';

export default function BidCheckoutPage() {
  const { bidId, tripId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  const users = useSelector((state: RootState) => state.account.users);
  const bid = useSelector(selectBid(bidId || ''));
  const trip = useSelector(selectTrip(tripId || ''));
  const [loading, setLoading] = useState(false);

  const paystackConfig = {
    email: user?.email || '',
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    amount: nairaToKobo(priceWithTDPercent(bid?.price || 0)),
    publicKey: paystackPublickKey,
  };
  const initializePayment = usePaystackPayment(paystackConfig);

  function onSuccess(payment?: Payment) {
    if (!bid || !trip || !payment || !user) return;
    setLoading(true);
    console.log(payment);
    // Promise.all([
    //   dispatch(
    //     toAnyAction(
    //       createOrUpdatePayment({
    //         ...payment,
    //         tripReference: trip.reference,
    //         amountInBid: bid.price,
    //         totalAmountPaid: priceWithTDPercent(bid.price),
    //       }),
    //     ),
    //   ),
    //   dispatch(
    //     toAnyAction(
    //       createOrUpdateBid({
    //         ...bid,
    //         status: 'accepted',
    //         paymentId: payment?.reference,
    //       }),
    //     ),
    //   ),
    //   dispatch(
    //     toAnyAction(
    //       assignTransporterToTrip({
    //         tripId,
    //         transporterId: bid.transporterId,
    //         paymentId: payment?.reference,
    //       }),
    //     ),
    //   ),
    // ])
    //   .then(() => {
    //     dispatch(toAnyAction(getTrips())).then(() => {
    //       navigate(`/my-trips/${tripId}/status`);
    //     });
    //   })
    //   .catch((err) => {
    //     Toast.error({ msg: err.message });
    //   })
    //   .finally(() => setLoading(false));
  }

  return (
    <>
      <CardContainer>
        <header>
          <img src={TruckDispatchLogo} alt="Truck dispatch logo" />
          <div>
            <span className="price-title">Total: </span>
            <span className="price">
              &#8358;{abbreviateNumber(priceWithTDPercent(bid?.price || 0))}
            </span>
          </div>
        </header>
        <h2>
          Thanks for trusting us to handle your dispatch, {user?.firstName}
        </h2>
        <h4>We wish you a safe trucking run.</h4>
        <Receipt>
          <Section>
            <div>Total</div>
            <div>
              &#8358;{abbreviateNumber(priceWithTDPercent(bid?.price || 0))}
            </div>
          </Section>
          <Section>
            <div>Base Fare</div>
            <div>&#8358;{abbreviateNumber(bid?.price || 0)}</div>
          </Section>
          <Section>
            <div>Agency Fee</div>
            <div>&#8358;{abbreviateNumber(tdPercentage(bid?.price || 0))}</div>
          </Section>
          <Section>
            <UiButton
              loading={loading}
              onClick={() => initializePayment(onSuccess)}
            >
              Complete Payment
            </UiButton>
          </Section>
        </Receipt>
        <SafetyPrecautions>
          <h2>The safety of your goods is our priority</h2>
          <p>
            We are committed to improving your experience and are always looking
            for ways to ensure your goods are as safe as possible when
            dispatching with us.{' '}
          </p>
          {/* TODO: replace link with link to blog */}
          <Link to="/">
            {' '}
            <div className="learn-more-text">Learn More</div>{' '}
            <UiIcon icon="ArrowRight" size="20" />
          </Link>
        </SafetyPrecautions>
        <TripDetails>
          <h2>Trip Details</h2>
          <TripPickupAndDropOff
            pickup={trip?.pickUpAddress || ''}
            dropOff={trip?.deliveryAddress || ''}
          />
          <div className="transporter-details">
            {/* TODO: input user avatar when avatars are ready */}
            <UiAvatar avatar={bid?.transporter.avatar} />
            <div>
              <h4 className="your-transporter-header">Your Transporter</h4>
              <div className="transporter-name">{`${bid?.transporter?.firstName} ${bid?.transporter?.lastName}`}</div>
            </div>
          </div>
        </TripDetails>
        {/* TODO: input referral details for user to refer another client or driver to enable him earn bonuses */}
        <ContactSupportMessage>
          If you need help, contact support
        </ContactSupportMessage>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  border: 1px solid var(--color-gray-200);
  border-radius: ${pxToRem(8)};
  color: var(--color-gray-600);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(24)};

    img {
      width: ${pxToRem(100)};
      margin-left: ${pxToRem(-16)};
    }
    .price {
      font-size: ${pxToRem(14)};
    }
    .price-title {
      font-size: ${pxToRem(14)};
      font-weight: bold;
    }
  }
  h2 {
    font-size: ${pxToRem(24)};
    padding: 0 ${pxToRem(20)};
  }

  h4 {
    padding: 0 ${pxToRem(20)};
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 60%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 35%;
  }
`;

const Receipt = styled.div`
  margin-top: ${pxToRem(60)};
  padding: 0 ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(24)};
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${pxToRem(24)} 0;

  &:first-child {
    font-weight: bold;
    font-size: ${pxToRem(20)};
  }
`;

const SafetyPrecautions = styled.section`
  background-color: var(--color-warning-100);
  padding: ${pxToRem(24)};

  h2 {
    font-size: ${pxToRem(24)};
    padding: 0;
  }
  a {
    display: flex;
    align-items: center;
    color: var(--color-success-700);
    font-size: ${pxToRem(16)};
    gap: ${pxToRem(8)};
    margin-top: ${pxToRem(32)};
  }
  .learn-more-text {
    margin-top: ${pxToRem(-4)};
  }
`;

const TripDetails = styled.section`
  padding: ${pxToRem(12)} ${pxToRem(24)};

  h2 {
    padding: 0;
  }

  .transporter-details {
    display: flex;
    align-items: flex-end;
    gap: ${pxToRem(12)};
    margin: ${pxToRem(16)} 0;
    padding: ${pxToRem(16)} 0;
    border-top: ${pxToRem(1)} solid var(--color-gray-200);

    h4 {
      font-size: ${pxToRem(14)};
      color: var(--color-gray-400);
      padding: 0;
      margin: 0;
    }

    .transporter-name {
      font-size: ${pxToRem(16)};
      color: var(--color-gray-500);
    }
  }
`;

const ContactSupportMessage = styled.p`
  font-size: ${pxToRem(14)};
  color: var(--color-gray-400);
  text-align: center;
`;

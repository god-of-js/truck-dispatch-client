import React from 'react';
import { useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';

import { selectDashboardUser } from 'modules/Account';
import { Link, useParams } from 'react-router-dom';
import { selectBid } from 'modules/Trips';
import styled from 'styled-components';
import sizes from 'utils/sizes';

import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import {
  abbreviateNumber,
  nairaToKobo,
  priceWithTDPercent,
  tdPercentage,
} from 'utils/helpers';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';

export default function BidCheckoutPage() {
  const { bidId } = useParams();
  const user = useSelector(selectDashboardUser);
  const bid = useSelector(selectBid(bidId || ''));

  const paystackConfig = {
    email: user?.email || '',
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    amount: nairaToKobo(priceWithTDPercent(bid?.price || 0)),
    publicKey: 'pk_test_0a7a8b8adcd87dea506fae49778b4d4c5b783f41',
  };
  function onSuccess(data?: unknown) {
    // Mark bid 
  }
  const initializePayment = usePaystackPayment(paystackConfig);
  return (
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
      <h2>Thanks for trusting us to handle your dispatch, {user?.firstName}</h2>
      <h4>We are </h4>
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
          <UiButton onClick={() => initializePayment(onSuccess)}>
            Complete Payment
          </UiButton>
        </Section>
      </Receipt>
      <SafetyPrecautions>
        <h2>The safety of your goods is our priority</h2>
        <p>We are committed to improving your experience and are always looking for ways to ensure your goods as safe as possible when dispatching with us. </p>
        {/* TODO: replace link with link to blog */}
        <Link to="/"> <div className='learn-more-text'>Learn More</div> <UiIcon icon="ArrowRight" size="20" /></Link>
      </SafetyPrecautions>
      <TripDetails>

      </TripDetails>
    </CardContainer>
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
    width: 50%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 35%;
  }
`;

const Receipt = styled.div`
  margin-top: ${pxToRem(60)};
  padding: 0 ${pxToRem(24)};
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
    margin-top: ${pxToRem(-4)}
  }
`;

const TripDetails = styled.section`
  padding: ${pxToRem(24)};
`
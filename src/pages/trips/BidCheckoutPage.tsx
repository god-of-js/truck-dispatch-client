import React from 'react';
import { useSelector } from 'react-redux';
import { selectDashboardUser } from 'modules/Account';
import { useParams } from 'react-router-dom';
import { selectBid } from 'modules/Trips';
import styled from 'styled-components';
import sizes from 'utils/sizes';

import TruckDispatchLogo from '../../assets/img/truck-dispatch-logo.svg';
import {
  abbreviateNumber,
  priceWithTDPercent,
  tdPercentage,
} from 'utils/helpers';
import UiButton from 'ui/UiButton';

export default function BidCheckoutPage() {
  const { bidId } = useParams();
  const user = useSelector(selectDashboardUser);
  const bid = useSelector(selectBid(bidId || ''));

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
          <UiButton>Complete Payment</UiButton>
        </Section>
      </Receipt>
      <SafetyPrecautions></SafetyPrecautions>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};
  color: var(--color-gray-600);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

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
    font-size: ${pxToRem(20)};
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

const SafetyPrecautions = styled.div``
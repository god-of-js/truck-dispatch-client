import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiModal from 'ui/UiModal';
import { abbreviateNumber } from 'utils/helpers';
import sizes from 'utils/sizes';
import { selectTrip } from 'modules/Trips';

interface Props {
  onClose: () => void;
  payment: PaymentRequest;
  isVisible: boolean;
}
export default function ViewPaymentDetails({
  onClose,
  isVisible,
  payment,
}: Props) {
  const trip = useSelector(selectTrip(payment.trip._id));
  return (
    <UiModal isVisible={isVisible} onClose={onClose}>
      <DetailsContainer>
        <h2>Payment Details</h2>
        <Section>
          <div className="title">Trip Pickup</div>
          <div className="value">{trip?.pickUpAddress}</div>
        </Section>
        <Section>
          <div className="title">Trip Delivery Address</div>
          <div className="value">{trip?.deliveryAddress}</div>
        </Section>
        <Section>
          <div className="title">Price of Trip</div>
          <div className="value">NGN {abbreviateNumber(payment.amount!)}</div>
        </Section>
        <Section>
          <div className="title">Trip Reference</div>
          <div className="value">{payment.tripReference}</div>
        </Section>
        <Section>
          <div className="title">Payment Reference</div>
          <div className="value">{payment.reference}</div>
        </Section>
        {payment.status === 'rejected' && (
          <Section>
            <div className="title">Reason for Reject</div>
            <div className="value">{payment.reasonForReject}</div>
          </Section>
        )}
        <Section>
          <div className="title">Type Of Goods</div>
          <div className="value">{trip?.typeOfGoods}</div>
        </Section>
        <Section>
          <div className="title">Shipping Line</div>
          <div className="value">{trip?.shippingLine || 'N/A'}</div>
        </Section>
        <Section>
          <div className="title">Job Type</div>
          <div className="value">{trip?.jobType || 'N/A'}</div>
        </Section>
        <Section>
          <div className="title">Size Of Container</div>
          <div className="value">{trip?.sizeOfContainer || 'N/A'}</div>
        </Section>
      </DetailsContainer>
    </UiModal>
  );
}

const DetailsContainer = styled.div`
  h2 {
    margin: 0;
    margin-bottom:24px;
    padding: 0;
    color: var(--color-gray-500);
    font-size:20px;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  font-size:16px;
  margin-bottom:24px;

  .title {
    color: var(--color-gray-400);
  }

  .value {
    color: var(--color-gray-600);
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    flex-direction: row;
    .title {
      width: 35%;
    }

    .value {
      width: 65%;
    }
  }
`;

import React from 'react';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiButton from 'ui/UiButton';
import sizes from 'utils/sizes';

interface Props {
  data: Trip;
  nextHandler: () => void;
  prevHandler: () => void;
  loading?: boolean;
}
export default function ConfirmTripDetails({
  data,
  prevHandler,
  nextHandler,
  loading,
}: Props) {
  return (
    <Layout>
      <Heading>Confirm Trip Details</Heading>
      <Section>
        <div className="title">Pick Up Address</div>
        <div className="value">{data.pickUpAddress}</div>
      </Section>
      <Section>
        <div className="title">Delivery Address</div>
        <div className="value">{data.deliveryAddress}</div>
      </Section>
      <Section>
        <div className="title">Pick Up Date</div>
        <div className="value">{data.pickUpDate}</div>
      </Section>
      <Section>
        <div className="title">Delivery Date</div>
        <div className="value">{data.deliveryDate}</div>
      </Section>
      <Section>
        <div className="title">Type Of Goods</div>
        <div className="value">{data.typeOfGoods}</div>
      </Section>
      <Section>
        <div className="title">Shipping Line</div>
        <div className="value">{data.shippingLine || 'N/A'}</div>
      </Section>
      <Section>
        <div className="title">Size Of Container</div>
        <div className="value">{data.sizeOfContainer || 'N/A'}</div>
      </Section>
      <Section>
        <div className="title">Weight of Goods(Tonnage)</div>
        <div className="value">{data.weight}Tons</div>
      </Section>
      <SubmitButtonContainer className="submit-button-container">
        <UiButton
          variant="secondary-outlined"
          onClick={prevHandler}
        >
          Back To Details
        </UiButton>
        <UiButton loading={loading} onClick={nextHandler}>
          Broadcast Job
        </UiButton>
      </SubmitButtonContainer>
    </Layout>
  );
}

const Layout = styled.div``;

const Heading = styled.h2`
  color: var(--color-gray-600);
  font-size: ${pxToRem(16)};
  margin: ${pxToRem(28)} 0;
`;
const Section = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${pxToRem(8)};
  font-size: ${pxToRem(16)};
  margin-bottom: ${pxToRem(24)};

  .title {
    color: var(--color-gray-400);
    width: 50%;
  }

  .value {
    color: var(--color-gray-600);
    width: 50%;
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    .title {
      width: 35%;
    }

    .value {
      width: 65%;
    }
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  justify-content: flex-end;
  padding-top: ${pxToRem(12)};
`;

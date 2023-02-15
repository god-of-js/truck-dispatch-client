import { selectTransporters } from 'modules/Account';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiButton from 'ui/UiButton';
import sizes from 'utils/sizes';

interface Props {
  data: Trip;
  loading?: boolean;
  actionText?: string;
  isActionButtonDisabled?: boolean;
  hideActionButtons?: boolean;
  notConfirm?: boolean;
  nextHandler?: () => void;
  prevHandler?: () => void;
}
export default function ConfirmTripDetails({
  data,
  isActionButtonDisabled,
  loading,
  actionText,
  hideActionButtons,
  notConfirm = false,
  prevHandler,
  nextHandler,
}: Props) {
  const transporters = useSelector(selectTransporters);

  return (
    <Layout>
      {/* TODO: remove confirm text when not confirm */}
      <Heading>{notConfirm ? '' : 'Confirm'} Trip Details</Heading>
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
      {!hideActionButtons && (
        <SubmitButtonContainer className="submit-button-container">
          <UiButton variant="secondary-outlined" onClick={prevHandler}>
            Go Back
          </UiButton>
          <UiButton
            loading={loading}
            disabled={isActionButtonDisabled}
            onClick={nextHandler}
          >
            {actionText || 'Broadcast Job'}
          </UiButton>
        </SubmitButtonContainer>
      )}
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
  flex-direction: column;
  gap: ${pxToRem(8)};
  font-size: ${pxToRem(16)};
  margin-bottom: ${pxToRem(24)};

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

const SubmitButtonContainer = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  justify-content: flex-end;
  padding-top: ${pxToRem(12)};
`;

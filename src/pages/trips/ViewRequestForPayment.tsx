import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import RejectPaymentWithReason from 'components/payment/RejectPaymentWithReason';
import { RootState } from 'modules/index';
import {
  requestPaymentByTransporter,
  setPaymentRequest,
} from 'modules/Payments';
import Asset from 'types/Asset';
import UiButton from 'ui/UiButton';
import UiCard from 'ui/UiCard';
import UiOverlay from 'ui/UiOverlay';
import sizes from 'utils/sizes';
import ConfirmApprovePayment from 'components/payment/ConfirmApprovePayment';
import PaymentRequest from 'types/PaymentRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { toAnyAction } from 'utils/helpers';

export default function ViewRequestForPayment() {
  const dispatch = useDispatch();
  const paymentRequest = useSelector(
    (state: RootState) => state.payment.paymentRequest,
  );
  const [isRejectVisible, setIsRejectVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  function setUpdatedPaymentRequest(request: PaymentRequest) {
    return dispatch(toAnyAction(requestPaymentByTransporter(request))).then(
      () => {
        dispatch(setPaymentRequest(request));
      },
    );
  }
  return (
    <CardContainer>
      <UiCard>
        {paymentRequest ? (
          <>
            {paymentRequest.status === 'completed' ? (
              <>Payment request has been approved.</>
            ) : (
              <>
                <h2>Verify validity of payment request</h2>
                <p>
                  The responsible transporter claims he has loaded the cargo and
                  is ready to proceed with the trip. Kindly confirm the loading
                  before his payment is forwarded. <br /> PS: payment is
                  required before start of the trip to enable the transporter
                  overcome issues that may arise during the trip.
                </p>
                <h3>Loading details</h3>

                <Section>
                  <div className="title">Driver Name</div>
                  <div className="value">{paymentRequest?.driverName}</div>
                </Section>
                <Section>
                  <div className="title">Driver Phone Number</div>
                  <div className="value">
                    <a href={'tel:' + paymentRequest?.driverPhoneNumber}>
                      {paymentRequest?.driverPhoneNumber}
                    </a>
                  </div>
                </Section>
                <Section>
                  <div className="title">Truck Plate Number</div>
                  <div className="value">
                    {paymentRequest?.truckPlateNumber}
                  </div>
                </Section>
                <Section>
                  <div className="title">Proof of Loading</div>
                  <div className="value">
                    <video controls>
                      <source
                        src={(paymentRequest?.containerVideo as Asset).url}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </Section>
                <div className="button-container">
                  <UiButton
                    variant="danger"
                    disabled={paymentRequest?.status === 'rejected'}
                    onClick={() => setIsRejectVisible(true)}
                  >
                    Reject With Reason
                  </UiButton>
                  <UiButton
                    onClick={() => {
                      setIsConfirmVisible(true);
                    }}
                  >
                    Approve Payment
                  </UiButton>
                </div>
              </>
            )}
          </>
        ) : (
          // TODO: Design proof of loading has not been uploaded yet
          <>Proof of Loading has not been uploaded yet. </>
        )}
      </UiCard>
      <UiOverlay isVisible={isRejectVisible}>
        <RejectPaymentWithReason
          paymentRequest={paymentRequest}
          onClose={() => setIsRejectVisible(false)}
          setPaymentRequest={setUpdatedPaymentRequest}
        />
      </UiOverlay>
      <UiOverlay isVisible={isConfirmVisible}>
        <ConfirmApprovePayment
          paymentRequest={paymentRequest}
          onClose={() => setIsConfirmVisible(false)}
          setPaymentRequest={setUpdatedPaymentRequest}
        />
      </UiOverlay>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 90%;
  margin: auto;

  h2 {
    font-size: ${pxToRem(20)};
    color: var(--color-gray-500);
  }
  h3 {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-500);
  }
  p {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-600);
  }

  video {
    width: 70%;
    margin: auto;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: ${pxToRem(48)};
    gap: ${pxToRem(8)};
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;

const Section = styled.section`
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

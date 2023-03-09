import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import { getPaymentRequestByTripId } from 'modules/Payments';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Asset from 'types/Asset';
import UiButton from 'ui/UiButton';
import UiCard from 'ui/UiCard';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

export default function ViewRequestForPayment() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const paymentRequest = useSelector(
    (state: RootState) => state.payment.paymentRequest,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(toAnyAction(getPaymentRequestByTripId(tripId))).finally(() => {
      setLoading(false);
    });
  }, [tripId]);

  return (
    <CardContainer>
      <UiCard>
        {loading ? (
          <Loader />
        ) : (
          <>
            {paymentRequest ? (
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
                  <UiButton variant="danger">
                    Reject Payment With Reason
                  </UiButton>
                  <UiButton>Approve Payment To Transporter</UiButton>
                </div>
              </>
            ) : (
              <>Proof of Loading has not been uploaded yet. </>
            )}
          </>
        )}
      </UiCard>
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

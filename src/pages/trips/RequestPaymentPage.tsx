import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import PaymentRequest from 'types/PaymentRequest';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import sizes from 'utils/sizes';

import {
  aValueHasBeenChanged,
  deepRootedToFormData,
  toAnyAction,
} from 'utils/helpers';
import {
  getPaymentRequestsOfDriver,
  requestPaymentByTransporter,
  updatePaymentRequestByTransporter,
} from 'modules/Payments';

import MessageWithImage from 'ui/MessageWithImage';
import Loader from 'components/layout/Loader';
import RequestPaymentSchema from 'utils/validations/RequestPaymentSchema';
import UiOverlay from 'ui/UiOverlay';
import NotifyUserToAddAccount from 'components/profile/NotifyUserToAddAccount';
import { RootState } from 'modules/index';

export default function ViewTripRequestPayment() {
  const { tripId } = useParams();
  const accountDetails = useSelector(
    (state: RootState) => state.account.user?.bankDetails,
  );
  const paymentRequest = useSelector(
    (state: RootState) => state.payment.paymentRequest,
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<{
    proofVideo: File | string | null;
  }>({
    proofVideo: null,
  });

  const [loading, setLoading] = useState(false);
  const [isNotifyUserToAddAccountVisible, setIsNotifyUserToAddAccountVisible] =
    useState(false);
  const disableButton = useMemo(() => {
    if (!paymentRequest) return false;
    return aValueHasBeenChanged(
      { proofVideo: paymentRequest.proofVideo },
      formData,
    );
  }, [paymentRequest, formData]);

  async function requestPayment() {
    try {
      if (!accountDetails) {
        setIsNotifyUserToAddAccountVisible(true);
        return;
      }
      setLoading(true);
      if (!tripId) return;
      const data = deepRootedToFormData(formData);
      const request = paymentRequest
        ? updatePaymentRequestByTransporter(data, tripId, paymentRequest._id)
        : requestPaymentByTransporter(data, tripId);
      dispatch(toAnyAction(request)).finally(() => {
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  }

  function setData(event: {
    name: string;
    value: string | null | File | File[];
  }) {
    setFormData((data) => ({
      ...data,
      [event.name]: event.value,
    }));
  }

  useEffect(() => {
    if (paymentRequest?.proofVideo && !formData.proofVideo) {
      setFormData({ proofVideo: paymentRequest.proofVideo });
    }
  }, [paymentRequest]);
  return (
    <>
      <PageStyling>
        {paymentRequest && paymentRequest?.status !== 'rejected' ? (
          <>
            <MessageWithImage
              title="Payment request has been received"
              subtitle="We have received your payment request. We would validate your trip status and get back to you. It normally takes a couple minutes for it to be verified. To view the status of the payment, navigate to the transcations page or click the button below"
            />
            <div className="btn-container">
              <Link to="/payments">
                <UiButton>View Payments</UiButton>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2>Request Payment</h2>
            <p>
              To request payment, upload A video showing the container on the
              truck as well as the truck plate number.
            </p>
            <UiForm
              formData={formData}
              schema={RequestPaymentSchema}
              onSubmit={requestPayment}
            >
              {({ errors }) => (
                <>
                  <GridContainer>
                    <FileUploadWidget
                      label="Video of the container on truck"
                      fileType="video"
                      name="proofVideo"
                      error={errors.proofVideo}
                      value={formData.proofVideo}
                      onChange={setData}
                    />
                  </GridContainer>
                  <UiButton loading={loading} disabled={disableButton}>
                    {paymentRequest?.status === 'rejected'
                      ? 'Update Payment Request'
                      : 'Request Payment'}
                  </UiButton>
                </>
              )}
            </UiForm>
          </>
        )}

        <UiOverlay isVisible={isNotifyUserToAddAccountVisible}>
          <NotifyUserToAddAccount
            onClose={() => {
              setIsNotifyUserToAddAccountVisible(false);
            }}
          />
        </UiOverlay>
      </PageStyling>
    </>
  );
}

const PageStyling = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  margin-top: ${pxToRem(24)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  h2 {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-700);
  }
  p {
    font-size: ${pxToRem(14)};
  }
  .btn-container {
    display: flex;
    justify-content: center;
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${pxToRem(12)};
  margin-bottom: ${pxToRem(12)};

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;

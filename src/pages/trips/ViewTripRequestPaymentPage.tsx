import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { selectDashboardUser } from 'modules/Account';
import PaymentRequest from 'types/PaymentRequest';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import sizes from 'utils/sizes';
import uuidv4 from 'utils/uuid';
import { uploadItem } from '../../api/Cloudinary';
import { toAnyAction } from 'utils/helpers';
import {
  getPaymentRequestsOfDriver,
  requestPaymentByTransporter,
  selectPaymentRequestByTripId,
} from 'modules/Payments';
import MessageWithImage from 'ui/MessageWithImage';
import Loader from 'components/layout/Loader';
import RequestPaymentSchema from 'utils/validations/RequestPaymentSchema';

export default function ViewTripRequestPayment() {
  const { tripId } = useParams();
  const user = useSelector(selectDashboardUser);
  const paymentRequest = useSelector(selectPaymentRequestByTripId(tripId!));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<PaymentRequest>({
    id: uuidv4(),
    status: 'pending',
    driverName: '',
    driverPhoneNumber: '',
    containerVideo: null,
    transporterId: user?.id || '',
    tripId: tripId!,
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  async function requestPayment() {
    setLoading(true);
    const containerVideoAsset = await uploadItem(
      formData.containerVideo as File,
      false,
    );

    dispatch(
      toAnyAction(
        requestPaymentByTransporter({
          ...formData,
          containerVideo: containerVideoAsset,
        }),
      ),
    ).finally(() => {
      setLoading(false);
    });
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
    dispatch(toAnyAction(getPaymentRequestsOfDriver())).finally(() => {
      setPageLoading(false);
    });
  });

  return (
    <PageStyling>
      {pageLoading ? (
        <Loader />
      ) : paymentRequest ? (
        <>
          <MessageWithImage
            title="Payment request has been received"
            subtitle="We have received your payment request. We would validate your trip status and get back to you. It normally takes a couple minutes for it to be verified. To view the status of the payment, navigate to the transcations page or click the button below"
          />
          <div className="btn-container">
            <UiButton>View Payment Request</UiButton>
          </div>
        </>
      ) : (
        <>
          <h2>Request Payment</h2>
          <p>To request payment, the following are required:</p>
          <ul>
            <li>
              A video showing the container on the truck as well as the truck
              plate number.
            </li>
            <li>Driver Name</li>
            <li>Driver Phone Number</li>
          </ul>
          <UiForm
            formData={formData}
            schema={RequestPaymentSchema}
            onSubmit={requestPayment}
          >
            {({ errors }) => (
              <>
                <GridContainer>
                  <UiInput
                    label="Driver Full Name"
                    value={formData.driverName}
                    name="driverName"
                    error={errors.driverName}
                    onChange={setData}
                  />
                  <UiInput
                    label="Driver Phone Number"
                    type="phone"
                    value={formData.driverPhoneNumber}
                    name="driverPhoneNumber"
                    error={errors.driverPhoneNumber}
                    onChange={setData}
                  />
                  <FileUploadWidget
                    label="Video of the container on truck"
                    fileType="video"
                    name="containerVideo"
                    error={errors.containerVideo}
                    value={formData.containerVideo as File}
                    onChange={setData}
                  />
                </GridContainer>
                <UiButton loading={loading}>Request Payment</UiButton>
              </>
            )}
          </UiForm>
        </>
      )}
    </PageStyling>
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

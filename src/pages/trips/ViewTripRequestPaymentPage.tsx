import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';
import Logo from '../../assets/img/truck-dispatch-logo-with-text.png';
import PaymentRequest from 'types/PaymentRequest';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import sizes from 'utils/sizes';
import { uploadItem } from '../../api/Cloudinary';
import {
  aValueHasBeenChanged,
  generateReference,
  toAnyAction,
} from 'utils/helpers';
import {
  getPaymentRequestsOfDriver,
  requestPaymentByTransporter,
  selectPaymentRequestByTripId,
} from 'modules/Payments';
import MessageWithImage from 'ui/MessageWithImage';
import Loader from 'components/layout/Loader';
import RequestPaymentSchema from 'utils/validations/RequestPaymentSchema';
import { getBidsWithTripId, selectBid, selectTrip } from 'modules/Trips';
import UiOverlay from 'ui/UiOverlay';
import NotifyUserToAddAccount from 'components/profile/NotifyUserToAddAccount';
import { RootState } from 'modules/index';
import uuidv4 from 'utils/uuid';

export default function ViewTripRequestPayment() {
  const { tripId } = useParams();
  const user = useSelector((state: RootState) => state.account.user);
  const accountDetails = useSelector(
    (state: RootState) => state.account.bankAccountDetails,
  );
  const trip = useSelector(selectTrip(tripId!));
  const bid = useSelector(selectBid(user?.id!, 'transporterId'));
  const paymentRequest = useSelector(selectPaymentRequestByTripId(tripId!));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<PaymentRequest>({
    id: tripId!,
    status: 'pending',
    paymentReference: uuidv4(),
    driverName: '',
    driverPhoneNumber: '',
    containerVideo: null,
    transporterId: user?.id || '',
    tripId: tripId!,
    truckPlateNumber: '',
    amount: 0,
    reference: '',
    tripReference: '',
  });

  const [loading, setLoading] = useState(false);
  const [isNotifyUserToAddAccountVisible, setIsNotifyUserToAddAccountVisible] =
    useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const disableButton = useMemo(() => {
    if (formData.status !== 'rejected') return false;
    return aValueHasBeenChanged(paymentRequest!, formData);
  }, [paymentRequest, formData]);

  async function requestPayment() {
    if (!accountDetails) {
      setIsNotifyUserToAddAccountVisible(true);
      return;
    }
    setLoading(true);
    let containerVideoAsset;
    if (formData.containerVideo instanceof File) {
      containerVideoAsset = await uploadItem(
        formData.containerVideo as File,
        false,
      );
    } else containerVideoAsset = formData.containerVideo;

    if (!bid) throw new Error('Bid does not exist');
    dispatch(
      toAnyAction(
        requestPaymentByTransporter({
          ...formData,
          containerVideo: containerVideoAsset,
          createdAt: formData.createdAt || Date.now(),
          updatedAt: Date.now(),
          amount: bid?.price,
          tripReference: trip?.reference!,
          reference: generateReference(),
          status: 'pending',
        }),
      ),
    )
      .then(() => {
        getDriversPaymentRequests();
      })
      .finally(() => {
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

  function getDriversPaymentRequests() {
    return dispatch(toAnyAction(getPaymentRequestsOfDriver())).then(
      (data: PaymentRequest[]) => {
        const tripPaymentRequest = data.find((req) => req.tripId === tripId);

        if (
          tripPaymentRequest?.status === 'rejected' &&
          formData.status !== 'rejected'
        )
          setFormData(tripPaymentRequest);
      },
    );
  }

  useEffect(() => {
    Promise.all([
      getDriversPaymentRequests(),
      dispatch(toAnyAction(getBidsWithTripId(tripId!))),
    ]).finally(() => {
      setPageLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Request Payment - TruckDispatch</title>
        <meta property="og:image" content={Logo} />
      </Helmet>
      <PageStyling>
        {pageLoading ? (
          <Loader />
        ) : paymentRequest && paymentRequest?.status !== 'rejected' ? (
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
                    <UiInput
                      label="Truck Plate Number"
                      value={formData.truckPlateNumber}
                      name="truckPlateNumber"
                      error={errors.truckPlateNumber}
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
                  <UiButton loading={loading} disabled={disableButton}>
                    {formData.status === 'rejected'
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

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Trip from 'types/Trip';
import sizes from 'utils/sizes';
import uuidv4 from 'utils/uuid';
import { generateReference, toAnyAction } from 'utils/helpers';
import { createOrUpdateTrip } from 'modules/Trips';

import UiTimeline, { TimelineStep } from 'ui/UiTimeline';
import NewTripForm from 'components/trips/NewTripForm';
import ViewTripDetails from 'components/trips/ViewTripDetails';
import MessageWithImage from 'ui/MessageWithImage';
import UiButton from 'ui/UiButton';
import UiBackButton from 'ui/UiBackButton';
import { selectDashboardUser } from 'modules/Account';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';

interface Step extends TimelineStep {
  value: CurrentStep;
}
type CurrentStep =
  | 'trip-form'
  | 'confirm-details'
  | 'broadcast-successful'
  | 'select-transporter'
  | 'payment';

export default function NewTripPage() {
  const user = useSelector(selectDashboardUser);
  const trips = useSelector((state: RootState) => state.trips.trips);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newTripSteps: Step[] = [
    {
      name: 'Trip Details',
      value: 'trip-form',
    },
    {
      name: 'Confirm Trip Details',
      value: 'confirm-details',
    },
    {
      name: 'Broadcast successful',
      value: 'broadcast-successful',
      invincible: true,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<CurrentStep>('trip-form');
  const [defaultFormData, setDefaultFormData] = useState<Trip>({
    id: '',
    agentId: user?.id || '',
    pickUpAddress: '',
    deliveryAddress: '',
    pickUpDate: '',
    deliveryDate: '',
    typeOfGoods: '',
    jobType: '',
    sizeOfContainer: '',
    shippingLine: '',
    weight: NaN,
    instructions: '',
    status: 'awaiting_bid',
    reference: '',
  });

  function nextHandler(formData?: Trip) {
    if (currentStep === 'trip-form' && formData) {
      setDefaultFormData(formData);
      setCurrentStep('confirm-details');
      return;
    }

    if (currentStep === 'confirm-details') {
      sendTripToDrivers().then(() => {
        setCurrentStep('broadcast-successful');
      });
    }
  }

  function prevHandler() {
    if (currentStep === 'trip-form') {
      return;
    }

    const indexOfCurrentStep = newTripSteps.findIndex(
      (step) => step.value === currentStep,
    );
    setCurrentStep(newTripSteps[indexOfCurrentStep - 1].value);
  }

  function sendTripToDrivers() {
    if (!user?.id) return;
    setLoading(true);
    const id = defaultFormData.id || uuidv4();
    const reference = generateReference();
    setDefaultFormData({ ...defaultFormData, id, reference });
    return dispatch(
      toAnyAction(createOrUpdateTrip({ ...defaultFormData, id, reference })),
    )
      .then(() => {
        if(defaultFormData.id) {
          Toast.success({msg:'Trip has been updated'})
          navigate(`/dashboard/my-trips/${defaultFormData.id}`)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <PageStyling>
      <UiBackButton />
      <CardContainer>
        <UiTimeline steps={newTripSteps} currentStep={currentStep} />
        <React.Suspense>
          <div className="children-container">
            {currentStep === 'trip-form' && (
              <NewTripForm
                defaultFormData={defaultFormData}
                nextHandler={nextHandler}
              />
            )}
            {currentStep === 'confirm-details' && (
              <ViewTripDetails
                data={defaultFormData}
                nextHandler={nextHandler}
                prevHandler={prevHandler}
                loading={loading}
              />
            )}

            {currentStep === 'broadcast-successful' && (
              <>
                {/* TODO: check why newly added trip details does not reflect when you go from here to trip bids */}
                <MessageWithImage
                  title="Your Trip has been broadcasted"
                  subtitle={`Your trip has been broadcasted to trusted transporters in our network. It usually takes a couple minutes to get matched with transporters. Expect several transporters to send bids on the trip you just created. You can view bids sent by transporters by clicking the button below. Thank you for trusting us with your dispatch. `}
                />
                <div className="button-container">
                  <Link to={`/dashboard/my-trips/${defaultFormData.id}/bids`}>
                    <UiButton>View Trips</UiButton>
                  </Link>
                </div>
              </>
            )}
          </div>
        </React.Suspense>
      </CardContainer>
    </PageStyling>
  );
}

const PageStyling = styled.div`
  padding: ${pxToRem(20)};
`;
const CardContainer = styled.div`
  background: #ffffff;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};
  width: 90%;
  margin: auto;
  margin-top: ${pxToRem(24)};

  .children-container {
    padding-top: ${pxToRem(16)};
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
    margin-top: ${pxToRem(48)};
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
    padding: ${pxToRem(48)};
  }
`;

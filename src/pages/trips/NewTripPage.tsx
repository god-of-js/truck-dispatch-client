import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Trip from 'types/Trip';
import sizes from 'utils/sizes';
import uuidv4 from 'utils/uuid';
import { toAnyAction } from 'utils/helpers';
import { createOrUpdateTrip } from 'modules/Trips';

import UiTimeline, { TimelineStep } from 'ui/UiTimeline';
import NewTripForm from 'components/trips/NewTripForm';
import ViewTripDetails from 'components/trips/ViewTripDetails';
import MessageWithImage from 'ui/MessageWithImage';
import UiButton from 'ui/UiButton';
import UiBackButton from 'ui/UiBackButton';
import { selectDashboardUser } from 'modules/Account';

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
  const dispatch = useDispatch();

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
    {
      name: 'Select Transporter',
      value: 'select-transporter',
    },
    {
      name: 'Payment',
      value: 'payment',
    },
  ];

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<CurrentStep>('trip-form');
  const [defaultFormData, setDefaultFormData] = useState<Trip>({
    id: uuidv4(),
    agentId: user?.id || '',
    pickUpAddress: '',
    deliveryAddress: '',
    pickUpDate: '',
    deliveryDate: '',
    typeOfGoods: '',
    sizeOfContainer: '',
    shippingLine: '',
    weight: NaN,
    description: '',
    status: 'awaiting_transporter',
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

    if (currentStep === 'broadcast-successful') {
      setCurrentStep('select-transporter');
    }
    if (currentStep === 'payment') {
      return;
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
    return dispatch(toAnyAction(createOrUpdateTrip(defaultFormData))).finally(
      () => {
        setLoading(false);
      },
    );
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
                <MessageWithImage
                  title="Your Trip has been broadcasted"
                  subtitle={`Your trip has been broadcasted to trusted transporters in our network. It usually takes a couple minutes to get matched with transporters. Expect a call or text message in the next couple of minutes to inform you of transporters available. You can view the list of transporters by clicking the button below. Thank you for trusting us with your dispatch. `}
                />
                <div className="button-container">
                  <UiButton onClick={nextHandler}>
                    View Transporters available for your trip
                  </UiButton>
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
  width: 90%;
  margin: auto;
  margin-top: ${pxToRem(24)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

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

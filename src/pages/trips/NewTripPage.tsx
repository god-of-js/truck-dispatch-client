import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import sizes from '../../utils/sizes';
import UiTimeline from 'ui/UiTimeline';
import NewTripForm from 'components/trips/NewTripForm';
import Trip from 'types/Trip';
import ConfirmTripDetails from 'components/trips/ConfirmTripDetails';

interface Step {
  name: string;
  value: CurrentStep;
}
type CurrentStep =
  | 'trip-form'
  | 'confirm-details'
  | 'select-transporter'
  | 'payment';

export default function NewTripPage() {
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
      name: 'Select Transporter',
      value: 'select-transporter',
    },
    {
      name: 'Payment',
      value: 'payment',
    },
  ];

  const [currentStep, setCurrentStep] = useState<CurrentStep>('trip-form');
  const [defaultFormData, setDefaultFormData] = useState<Trip>({
    pickUpAddress: '',
    deliveryAddress: '',
    pickUpDate: '',
    deliveryDate: '',
    typeOfGoods: '',
    sizeOfContainer: '',
    shippingLine: '',
    weight: 0,
    description: '',
  });

  function nextHandler(formData?: Trip) {
    if (currentStep === 'trip-form' && formData) {
      setDefaultFormData(formData);
      setCurrentStep('confirm-details');
      return;
    }

    if (currentStep === 'payment') {
      return;
    }
    const indexOfCurrentStep = newTripSteps.findIndex(
      (step) => step.value === currentStep,
    );

    setCurrentStep(newTripSteps[indexOfCurrentStep + 1].value);
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

  const currentComponent = useMemo(() => {
    if (currentStep === 'trip-form') {
      return (
        <NewTripForm
          defaultFormData={defaultFormData}
          nextHandler={nextHandler}
        />
      );
    }

    if (currentStep === 'confirm-details') {
      return (
        <ConfirmTripDetails
          data={defaultFormData}
          nextHandler={nextHandler}
          prevHandler={prevHandler}
        />
      );
    }
  }, [currentStep]);

  return (
    <PageContainer>
      <UiTimeline steps={newTripSteps} currentStep={currentStep} />
      <React.Suspense>
        <div className="children-container">{currentComponent}</div>
      </React.Suspense>
    </PageContainer>
  );
}

const PageContainer = styled.div`
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

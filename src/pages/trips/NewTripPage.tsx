import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import sizes from '../../utils/sizes';
import UiTimeline from 'ui/UiTimeline';
import NewTripForm from 'components/trips/NewTripForm';
import Trip from 'types/Trip';

export default function NewTripPage() {
  const newTripSteps = [
    {
      name: 'Trip Details',
      value: 'trip-details',
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

  const [currentStep, setCurrentStep] = useState('trip-details');
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
  const newTripForm = <NewTripForm defaultFormData={defaultFormData} />;

  const currentComponent = useMemo(() => {
    return newTripForm;
  }, []);
  return (
    <PageContainer>
      <UiTimeline steps={newTripSteps} currentStep={currentStep} />
      <div className="children-container">{currentComponent}</div>
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

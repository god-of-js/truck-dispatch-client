import { Suspense, useState } from 'react';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import UiModal from 'ui/UiModal';
import UiSteps from 'ui/UiSteps';
import SelectTruckType from './SelectTruckType';
import UploadVehicleImages from './UploadVehicleImages';

interface Props {
  onClose: () => void;
}
export default function AddVehicle({ onClose }: Props) {
  const [vehicle, setVehicleData] = useState<CreateVehicleData>({
    vehicleType: '',
    frontViewImg: null,
    backViewImg: null,
    backInnerViewImg: null,
    firstSideViewImg: null,
    secondSideViewImg: null,
    driverCockpitImg: null,
  });
  const steps = [
    {
      title: 'Select truck type',
    },
    {
      title: 'Upload Images',
    },
    {
      title: 'Driver details',
    },
  ];
  const [currentStepTitle, setCurrentStepTitle] = useState(steps[0].title);

  function nextStep(data: Partial<CreateVehicleData>) {
    setVehicleData((formData) => ({
      ...formData,
      ...data,
    }));
    const indexOfCurrentStep = steps.findIndex(
      (step) => step.title === currentStepTitle,
    );
    const nextTitle = steps[indexOfCurrentStep + 1].title;
    setCurrentStepTitle(nextTitle);
  }
  function goPrev() {
    const indexOfCurrentStep = steps.findIndex(
      (step) => step.title === currentStepTitle,
    );
    const prevTitle = steps[indexOfCurrentStep - 1].title;
    setCurrentStepTitle(prevTitle);
  }

  return (
    <UiModal title="Add Vehicle" onClose={onClose} goPrev={goPrev}>
      <UiSteps steps={steps} currentStepTitle={currentStepTitle} noDetail />
      <Body>
        <Suspense>
          {currentStepTitle === 'Select truck type' && (
            <SelectTruckType vehicle={vehicle} goToNext={nextStep} />
          )}
          {currentStepTitle === 'Upload Images' && (
            <UploadVehicleImages vehicle={vehicle} goToNext={nextStep} />
          )}
        </Suspense>
      </Body>
    </UiModal>
  );
}

const Body = styled.div`
  padding: ${pxToRem(24)};
`;

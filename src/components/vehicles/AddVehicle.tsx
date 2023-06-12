import { createVehicle } from 'modules/Vehicle';
import { Suspense, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import UiModal from 'ui/UiModal';
import UiSteps from 'ui/UiSteps';
import { deepRootedToFormData, toAnyAction } from 'utils/helpers';
import DriverDetailsForm from './DriverDetailsForm';
import SelectTruckType from './SelectTruckType';
import UploadVehicleImages from './UploadVehicleImages';

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function AddVehicle({ isVisible, onClose }: Props) {
  const dispatch = useDispatch();
  const [vehicle, setVehicleData] = useState<CreateVehicleData>({
    plateNumber: '',
    vehicleType: '',
    images: {
      frontView: null,
      backView: null,
      leftSideView: null,
      rightSideView: null,
      driversCockPit: null,
      backInnerView: null,
    },
    driver: {
      name: '',
      phone: '',
      driverLicense: '',
      avatar: null,
    },
  });
  const [loading, setLoading] = useState(false);
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

  function closeModal() {
    onClose();
  }

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

  function addVehicle(vehicleData: CreateVehicleData) {
    setLoading(true);
    const data = deepRootedToFormData(vehicleData);
    dispatch(toAnyAction(createVehicle(data)))
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <UiModal
      isVisible={isVisible}
      title="Add Vehicle"
      onClose={closeModal}
      goPrev={goPrev}
    >
      <UiSteps steps={steps} currentStepTitle={currentStepTitle} noDetail />
      <Body>
        <Suspense>
          {currentStepTitle === 'Select truck type' && (
            <SelectTruckType vehicle={vehicle} goToNext={nextStep} />
          )}
          {currentStepTitle === 'Upload Images' && (
            <UploadVehicleImages vehicle={vehicle} goToNext={nextStep} />
          )}
          {currentStepTitle === 'Driver details' && (
            <DriverDetailsForm
              vehicle={vehicle}
              loading={loading}
              finish={addVehicle}
            />
          )}
        </Suspense>
      </Body>
    </UiModal>
  );
}

const Body = styled.div`
  padding: ${pxToRem(24)};
`;

import Loader from 'components/layout/Loader';
import { createVehicle } from 'modules/Vehicle';
import { lazy, Suspense, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import UiConfirmModal from 'ui/UiConfirmModal';
import { deepRootedToFormData, toAnyAction } from 'utils/helpers';

const UiModal = lazy(() => import('ui/UiModal'));
const UiSteps = lazy(() => import('ui/UiSteps'));
const DriverDetailsForm = lazy(() => import('./DriverDetailsForm'));
const SelectTruckType = lazy(() => import('./SelectTruckType'));
const UploadVehicleImages = lazy(() => import('./UploadVehicleImages'));
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

  return !loading ? (
    <UiModal
      isVisible={isVisible}
      title="Add Vehicle"
      onClose={onClose}
      goPrev={goPrev}
      position="center"
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
  ) : (
    <UiConfirmModal
      hideModalClose
      hideActions
      hideNotYetButton
      isVisible={loading}
      variant="primary"
      title="Uploading File ..."
      onClose={onClose}
    >
      <LoadingContent>
        <Loader />
        <Message>
          <p>Please wait while we update your record</p>
          <p>Note: File Uploads Could Take 30 - 60 seconds</p>
        </Message>
      </LoadingContent>
    </UiConfirmModal>
  );
}

const Body = styled.div`
  padding: ${pxToRem(24)};
`;

const LoadingContent = styled.div`
  padding: 16px;
  display: flex;
  gap: 30px;
  flex-direction: column;

  p {
    font-weight: 600;
    font-size: ${pxToRem(14)};
    line-height: 20%;
    letter-spacing: -0.02em;
    color: var(--color-gray-80);
  }
`;

const Message = styled.div`
  text-transform: capitalize;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createTrip, getTrip, selectTrip, updateTrip } from 'modules/Trips';
import NewTrip from 'types/NewTrip';
import Trip from 'types/Trip';
import { removeUneditedFields, toAnyAction } from 'utils/helpers';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));
const NewTripForm = lazy(() => import('./NewTripForm'));
const TripDetails = lazy(() => import('./TripDetails'));
const UiCard = lazy(() => import('ui/UiCard'));
const UiIcon = lazy(() => import('ui/UiIcon'));

interface Props {
  tripId?: string;
  onClose: () => void;
  onCreated?: (tripId: string) => void;
  isVisible: boolean;
}
export default function CreateTrip({
  tripId,
  onClose,
  onCreated,
  isVisible,
}: Props) {
  const dispatch = useDispatch();
  const trip = useSelector(selectTrip(tripId || ''));

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    'trip-form' | 'confirm-details'
  >('trip-form');
  const [tripForm, setTripForm] = useState<NewTrip | Trip>({
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
    proposedPrice: NaN,
  });

  function nextHandler(formData?: NewTrip | Trip) {
    if (currentStep === 'trip-form' && formData) {
      setTripForm(formData);
      setCurrentStep('confirm-details');
      return;
    }

    if (currentStep === 'confirm-details') {
      if (!trip) {
        sendTripToDrivers().then(() => {});
      } else {
        editTrip();
      }
    }
  }

  function sendTripToDrivers() {
    setLoading(true);
    return dispatch(toAnyAction(createTrip(tripForm as NewTrip)))
      .then((trip: Trip) => {
        setTripForm(trip);
        onCreated?.(trip._id);
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function editTrip() {
    if (!trip) return;
    setLoading(true);
    const data = removeUneditedFields<Trip>(trip, tripForm);
    return dispatch(toAnyAction(updateTrip({ ...data, _id: trip._id })))
      .then((trip: Trip) => {
        setTripForm(trip);
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (tripId) {
      setLoading(true);
      dispatch(toAnyAction(getTrip(tripId))).then(() => {
        setLoading(false);
      });
    }
  }, [tripId]);

  return (
    <UiModal
      title="Create New Trip"
      position="right"
      bgVariant="dark"
      onClose={onClose}
      isVisible={isVisible}
    >
      <CreateTripStyling>
        {currentStep === 'trip-form' && (
          <>
            <UiButton variant="secondary" onClick={onClose}>
              <UiIcon icon="ArrowLeft" /> <span>BACK TO MY TRIPS</span>
            </UiButton>
            <NewTripForm
              tripFormData={tripForm}
              tripId={tripId}
              nextHandler={nextHandler}
            />
          </>
        )}
        {currentStep === 'confirm-details' && (
          <>
            <UiButton
              variant="secondary"
              onClick={() => setCurrentStep('trip-form')}
            >
              <UiIcon icon="ArrowLeft" /> <span>BACK </span>
            </UiButton>
            <TripDetailsContainer>
              <UiCard>
                <Heading>Trip Details</Heading>
                <TripDetails trip={tripForm} />
              </UiCard>
            </TripDetailsContainer>
            <SubmitButtonContainer>
              <UiButton size="large" loading={loading} onClick={nextHandler}>
                {!!trip ? 'Update' : 'Broadcast'} Trip
              </UiButton>
            </SubmitButtonContainer>
          </>
        )}
      </CreateTripStyling>
    </UiModal>
  );
}

const CreateTripStyling = styled.div`
  padding: ${pxToRem(32)} ${pxToRem(24)};
`;

const TripDetailsContainer = styled.div`
  margin: ${pxToRem(32)} 0;

  .ui-card {
    padding-bottom: ${pxToRem(54)};
  }
`;

const Heading = styled.h2`
  font-family: 'thiccboi-light';
  font-style: normal;
  font-weight: 400;
  font-size: ${pxToRem(16)};
  line-height: 140%;
  letter-spacing: 0.05em;
  color: var(--color-gray-70);
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  margin-bottom: ${pxToRem(20)};
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${pxToRem(12)};

  button {
    min-width: ${pxToRem(329)};
  }
`;

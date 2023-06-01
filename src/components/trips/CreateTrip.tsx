import { createTrip, getTrip, selectTrip, updateTrip } from 'modules/Trips';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NewTrip from 'types/NewTrip';
import Trip from 'types/Trip';
import UiButton from 'ui/UiButton';
import UiCard from 'ui/UiCard';
import UiIcon from 'ui/UiIcon';
import UiModal from 'ui/UiModal';
import { removeUneditedFields, toAnyAction } from 'utils/helpers';
import NewTripForm from './NewTripForm';
import TripDetails from './TripDetails';

interface Props {
  onClose: () => void;
}
export default function CreateTrip({ onClose }: Props) {
  const dispatch = useDispatch();
  const { tripId } = useParams();
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
  });

  function nextHandler(formData?: NewTrip | Trip) {
    if (currentStep === 'trip-form' && formData) {
      setTripForm(formData);
      setCurrentStep('confirm-details');
      return;
    }

    if (currentStep === 'confirm-details') {
      if (!trip) {
        sendTripToDrivers().then(() => {
          //   setCurrentStep('broadcast-successful');
        });
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
    >
      <CreateTripStyling>
        {currentStep === 'trip-form' && (
          <>
            <UiButton variant="secondary" onClick={onClose}>
              <UiIcon icon="ArrowLeft" /> <span>BACK TO MY TRIPS</span>
            </UiButton>
            <NewTripForm tripFormData={tripForm} nextHandler={nextHandler} />
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
                {!!trip ? 'Update Trip' : 'Broadcast'} Trip
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

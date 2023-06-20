import { createBid, selectBid, updateBid } from 'modules/Bid';
import { RootState } from 'modules/index';
import { getVehicles } from 'modules/Vehicle';
import { lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Bid from 'types/Bid';
import CreateBid from 'types/CreateBid';
import { removeUneditedFields, toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';
import { Toast } from 'utils/toast';
import BidForJobSchema from 'utils/validations/BidForJobSchema';
import Vehicle from 'types/Vehicle';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';

const UiButton = lazy(() => import('ui/UiButton'));
const UiDataField = lazy(() => import('ui/UiDataField'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiLocationsInput = lazy(() => import('ui/UiLocationsInput'));
const UiModal = lazy(() => import('ui/UiModal'));
const UiSelect = lazy(() => import('ui/UiSelect'));
const UiTextArea = lazy(() => import('ui/UiTextArea'));
interface Props {
  jobId: string;
  onClose: () => void;
  backToJobDetails: () => void;
  initCreateVehicle: () => void;
  isVisible: boolean;
}
export default function BidForJob({
  jobId,
  onClose,
  backToJobDetails,
  initCreateVehicle,
  isVisible,
}: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const bid = useSelector(selectBid(jobId, 'trip'));

  const [formData, setFormData] = useState<CreateBid>({
    price: NaN,
    presentLocation: '',
    extraNotes: '',
    tripId: jobId,
    vehicleId: '',
    vehicle: {} as Vehicle,
  });
  const [loading, setLoading] = useState(false);
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);

  const vehicleData = useMemo(
    () =>
      vehicles.map((vehicle) => ({
        value: vehicle._id,
        label: `${vehicle.vehicleType} - ${vehicle.driver.name}`,
      })),
    [vehicles],
  );

  const buttonIsDisabled = useMemo(() => {
    if (!bid) return false;
    const { tripId, ...data } = formData;
    const editedData = removeUneditedFields(
      { ...bid, vehicleId: bid.vehicle._id },
      data,
    );
    return Object.keys(editedData).length === 0;
  }, [formData, bid]);

  const vehicle = useMemo(() => {
    if (!formData.vehicleId) return null;

    return vehicles.find(({ _id }) => _id === formData.vehicleId);
  }, [vehicles, formData.vehicleId]);

  function fillForm({ name, value }: { name: string; value: string | null }) {
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function bidOnJob() {
    if (!user || !vehicle) {
      Toast.error({ msg: 'User or Vehicle is not present.' });
      return;
    }
    setLoading(true);
    return dispatch(
      toAnyAction(
        createBid({
          ...formData,
          tripId: jobId,
          vehicle,
        }),
      ),
    ).finally(() => {
      setLoading(false);
    });
  }

  function updateJobBid() {
    const dataToUpdate = removeUneditedFields<Bid>(bid!, {
      ...formData,
      vehicle,
    });
    setLoading(true);
    return dispatch(
      toAnyAction(
        updateBid({
          ...dataToUpdate,
          tripId: jobId!,
          vehicleId: '',
        } as CreateBid),
      ),
    ).finally(() => {
      setLoading(false);
    });
  }

  function onSubmit() {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      return;
    }
    bid ? updateJobBid() : bidOnJob();
  }
  useEffect(() => {
    dispatch(toAnyAction(getVehicles()));
  }, []);

  useEffect(() => {
    if (bid) {
      setFormData({
        price: bid.price,
        presentLocation: bid.presentLocation!,
        vehicle: bid.vehicle,
        vehicleId: bid.vehicle._id,
        tripId: jobId,
        extraNotes: bid.extraNotes!,
      });
    }
  }, [bid]);

  return (
    <UiModal
      isVisible={isVisible}
      position="right"
      title="Submit Bid"
      onClose={onClose}
    >
      <ComponentStyling>
        <UiButton variant="secondary" onClick={backToJobDetails}>
          <UiIcon icon="ArrowLeft" /> Back to job details
        </UiButton>

        <UiForm
          formData={formData}
          schema={BidForJobSchema}
          onSubmit={onSubmit}
        >
          {({ errors }) => (
            <>
              <div className="form-group">
                <div className="base-details">
                  <UiInput
                    value={formData.price}
                    name="price"
                    type="number"
                    label="How much would you charge for the trip?"
                    error={errors.price}
                    onChange={fillForm}
                  />
                  <div className="vehicle-details">
                    <UiSelect
                      value={formData.vehicleId}
                      name="vehicleId"
                      label="Select Vehicle/Truck"
                      error={errors.vehicleId}
                      onChange={fillForm}
                      options={vehicleData}
                    />
                    <ButtonContainer>
                      <UiButton
                        variant="primary-text"
                        textCasing="normal"
                        size="text"
                        type="button"
                        onClick={initCreateVehicle}
                      >
                        Add new vehicle?
                      </UiButton>
                    </ButtonContainer>

                    {vehicle && (
                      <UiDataField
                        title="Plate Number"
                        value={vehicle.plateNumber}
                        size="s"
                        isBordered
                      />
                    )}
                    {vehicle && (
                      <UiDataField
                        title="Driver Phone Number"
                        value={vehicle.driver.phone}
                        size="s"
                        isBordered
                      />
                    )}
                  </div>
                  <UiLocationsInput
                    value={formData.presentLocation}
                    name="presentLocation"
                    label="Current Location Of Truck"
                    placeholder="Where is the truck located/parked currently?"
                    error={errors.presentLocation}
                    onChange={fillForm}
                  />
                </div>
                <div className="text-area-container">
                  <UiTextArea
                    value={formData.extraNotes}
                    name="extraNotes"
                    placeholder="Add extra notes here to improve your bid"
                    label="Extra Notes? (Optional)"
                    onChange={fillForm}
                  />
                </div>
              </div>
              <div className="action-btn">
                <UiButton
                  size="large"
                  loading={loading}
                  disabled={buttonIsDisabled}
                >
                  {bid ? 'Update' : 'Submit'} Bid
                </UiButton>
              </div>
            </>
          )}
        </UiForm>
      </ComponentStyling>
      <InformUserOfVerification
        isVisible={isInformUserOfVerificationModalVisible}
        onClose={() => setIsInformUserOfVerificationModalVisible(false)}
      />
    </UiModal>
  );
}

const ComponentStyling = styled.div`
  padding: ${pxToRem(32)} ${pxToRem(24)};
  height: 100%;
  overflow-y: auto;

  .form-group {
    display: grid;
    grid-template-columns: auto;
    gap: ${pxToRem(24)};
    margin-top: ${pxToRem(64)};

    .base-details {
      display: grid;
      gap: ${pxToRem(24)};
      height: 100%;

      .vehicle-details {
        display: grid;
        gap: ${pxToRem(8)};
      }
    }
    .text-area-container {
      height: 100%;
      .ui-field {
        height: 100%;
      }
      textarea {
        height: calc(100% - 32px);
        width: 100%;
        resize: none;
      }
    }

    @media screen and (min-width: ${sizes.tablet}) {
      grid-template-columns: auto auto;
    }
  }
  .action-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: ${pxToRem(100)};
    background: white;
    button {
      width: 100%;
    }

    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      button {
        width: 60%;
      }
    }
    @media screen and (min-width: ${sizes.tablet}) {
      position: absolute;
      bottom: 0;
      /* margin-bottom: ${pxToRem(60)}; */
    }
  }
`;

const ButtonContainer = styled.div`
  button {
    margin-top: 0;
  }
`;

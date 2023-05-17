import { createBid } from 'modules/Bid';
import { RootState } from 'modules/index';
import { getVehicles } from 'modules/Vehicle';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Bid from 'types/Bid';
import CreateBid from 'types/CreateBid';
import UiButton from 'ui/UiButton';
import UiDataField from 'ui/UiDataField';
import UiForm from 'ui/UiForm';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiModal from 'ui/UiModal';
import UiSelect from 'ui/UiSelect';
import UiTextArea from 'ui/UiTextArea';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';
import { Toast } from 'utils/toast';

interface Props {
  jobId: string;
  onClose: () => void;
  backToJobDetails: () => void;
}
export default function BidForJob({ jobId, onClose, backToJobDetails }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

  const [formData, setFormData] = useState({
    price: NaN,
    presentLocation: '',
    extraNotes: '',
    tripId: jobId,
    vehicleId: '',
  });
  const [loading, setLoading] = useState(false);

  const vehicleData = useMemo(
    () =>
      vehicles.map((vehicle) => ({
        value: vehicle._id,
        label: `${vehicle.vehicleType} - ${vehicle.driver.name}`,
      })),
    [vehicles],
  );

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
    dispatch(
      toAnyAction(
        createBid({
          ...formData,
          tripId: jobId,
          vehicle
        }),
      ),
    ).finally(() => {
      setLoading(true);
    });
  }

  useEffect(() => {
    dispatch(toAnyAction(getVehicles()));
  }, []);

  return (
    <UiModal position="right" title="Submit Bid" onClose={onClose}>
      <ComponentStyling>
        <UiButton variant="secondary" onClick={backToJobDetails}>
          <UiIcon icon="ArrowLeft" /> Back to job details
        </UiButton>

        <UiForm formData={formData} onSubmit={bidOnJob}>
          {() => (
            <>
              <div className="form-group">
                <div className="base-details">
                  <UiInput
                    value={formData.price}
                    name="price"
                    type="number"
                    label="How much would you charge for the trip?"
                    onChange={fillForm}
                  />
                  <div className="vehicle-details">
                    <UiSelect
                      value={formData.vehicleId}
                      name="vehicleId"
                      label="Select Vehicle/Truck"
                      onChange={fillForm}
                      options={vehicleData}
                    />
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
                <UiButton size="large">Submit Bid</UiButton>
              </div>
            </>
          )}
        </UiForm>
      </ComponentStyling>
    </UiModal>
  );
}

const ComponentStyling = styled.div`
  padding: ${pxToRem(32)} ${pxToRem(24)};
  display: grid;
  gap: ${pxToRem(64)};
  height: 100%;

  .form-group {
    display: grid;
    grid-template-columns: auto;
    gap: ${pxToRem(24)};

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
      }
    }

    @media screen and (min-width: ${sizes.tablet}) {
      grid-template-columns: auto auto;
    }
  }
  .action-btn {
    width: calc(100% - 48px);
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    margin: ${pxToRem(40)} 0;
    background: white;
    button {
      width: 60%;
    }
  }
`;

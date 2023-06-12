import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import UiModal from 'ui/UiModal';
import DriverDetailsForm from './DriverDetailsForm';
import Vehicle from 'types/Vehicle';
import CreateVehicleData from 'types/CreateVehicleData';
import {
  deepRootedToFormData,
  removeUneditedFields,
  toAnyAction,
} from 'utils/helpers';
import { updateVehicle } from 'modules/Vehicle';
interface Props {
  onClose: () => void;
  vehicle: Vehicle;
  isVisible: boolean;
}

export default function EditVehicle({ isVisible, onClose, vehicle }: Props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function editVehicle(vehicleData: CreateVehicleData) {
    setLoading(true);
    const changedData = removeUneditedFields<CreateVehicleData>(
      vehicle,
      vehicleData,
    );
    const data = deepRootedToFormData(changedData);
    dispatch(toAnyAction(updateVehicle(data, `${vehicle._id}`)))
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
      position={'center'}
      title="Edit Vehicle"
      onClose={onClose}
    >
      <Body>
        <DriverDetailsForm
          finish={editVehicle}
          loading={loading}
          vehicle={vehicle}
          edit
        />
      </Body>
    </UiModal>
  );
}

const Body = styled.div`
  padding: ${pxToRem(24)};
`;

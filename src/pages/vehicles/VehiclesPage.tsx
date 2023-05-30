import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UiButton from 'ui/UiButton';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiOverlay from 'ui/UiOverlay';
import AddVehicle from 'components/vehicles/AddVehicle';
import { toAnyAction } from 'utils/helpers';
import { getVehicles } from 'modules/Vehicle';
import { RootState } from 'modules/index';
import VehicleItem from 'components/vehicles/Vehicle';
import sizes from 'utils/sizes';
import EditVehicle from 'components/vehicles/EditVehicle';
import Vehicle from 'types/Vehicle';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';

export default function VehiclesPage() {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const [isAddVehicleVisible, setIsAddVehicleVisible] = useState(false);
  const [isEditVehicleVisible, setIsEditVehicleVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  function closeAddVehicle() {
    setIsAddVehicleVisible(false);
  }

  function openAddVehicle() {
    setIsAddVehicleVisible(true);
  }

  function closeEditVehicle() {
    setSelectedVehicle(null);
    setIsEditVehicleVisible(false);
  }

  function openEditVehicle(vehicle: Vehicle) {
    setSelectedVehicle(vehicle);
    setIsEditVehicleVisible(true);
  }

  function handleChange({ value }: { name: string; value: string | null }) {
    setSearchQuery(value!!);
  }

  function edgeChildren() {
    return (
      <GappedContainerWith12PX>
        <UiInput
          onChange={handleChange}
          value={searchQuery}
          name="searchQuery"
          placeholder="Search..."
          icon="Search"
        />
        {!!vehicles.length && (
          <UiButton size="large" onClick={openAddVehicle}>add new vehicle</UiButton>
        )}
      </GappedContainerWith12PX>
    );
  }

  useEffect(() => {
    dispatch(toAnyAction(getVehicles()));
  }, []);

  return (
    <>
      <DashboardTopNav routeName="Vehicles" edgeChild={edgeChildren()} />
      <Vehicles>
        {vehicles.map((vehicle) => (
          <VehicleItem
            vehicle={vehicle}
            key={vehicle._id}
            openEditVehicle={openEditVehicle}
          />
        ))}
      </Vehicles>

      {!vehicles.length && (
        <EmptyVehicleContainer>
          <UiIcon icon="DuoTrucks" />
          <p>
            You’ve not added any vehicles yet.Load up your trucks in our big
            garage, so you’d be able to bid on jobs
          </p>
          <UiButton onClick={openAddVehicle}>add new vehicle</UiButton>
        </EmptyVehicleContainer>
      )}

      <UiOverlay isVisible={isAddVehicleVisible}>
        <AddVehicle onClose={closeAddVehicle} />
      </UiOverlay>

      <UiOverlay isVisible={isEditVehicleVisible}>
        {selectedVehicle && (
          <EditVehicle onClose={closeEditVehicle} vehicle={selectedVehicle} />
        )}
      </UiOverlay>
    </>
  );
}

const GappedContainerWith12PX = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(12)};
`;

const EmptyVehicleContainer = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--color-gray-80);
  font-size: ${pxToRem(20)};
  max-width: ${pxToRem(492)};
  margin: auto;
  p {
    text-align: center;
  }
  button {
    padding: 0 ${pxToRem(28)};
  }

  svg {
    width: 301px;
    height: 80px;
  }
`;

const Vehicles = styled.div`
  display: grid;
  gap: ${pxToRem(22)};
  padding-top: ${pxToRem(32)};

  @media screen and (min-width: ${sizes.mobileSmall}) {
    display: flex;
    flex-wrap: wrap;
  }
`;

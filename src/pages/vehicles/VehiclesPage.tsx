import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UiButton from 'ui/UiButton';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import AddVehicle from 'components/vehicles/AddVehicle';
import { searchObjectsByField, toAnyAction } from 'utils/helpers';
import { getVehicles, deleteVehicle } from 'modules/Vehicle';
import { RootState } from 'modules/index';
import VehicleItem from 'components/vehicles/VehicleItem';
import sizes from 'utils/sizes';
import EditVehicle from 'components/vehicles/EditVehicle';
import Vehicle from 'types/Vehicle';
import UiIcon from 'ui/UiIcon';
import UiConfirmModal from 'ui/UiConfirmModal';
import { Toast } from 'utils/toast';

export default function VehiclesPage() {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const [isAddVehicleVisible, setIsAddVehicleVisible] = useState(false);
  const [isEditVehicleVisible, setIsEditVehicleVisible] = useState(false);
  const [deleteVehicleIsLoading, setDeleteVehicleIsLoading] = useState(false);
  const [deleteVehicleIsVisible, setDeleteVehicleIsVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const sortedVehicles = useMemo(() => {
    if (!searchQuery) return vehicles;
    return searchObjectsByField(vehicles, searchQuery, [
      'plateNumber',
      'vehicleType',
      'driver.name',
    ]);
  }, [vehicles, searchQuery]);
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
  function openDeleteVehicle(vehicleId: string) {
    setSelectedVehicleId(vehicleId);
    setDeleteVehicleIsVisible(true);
  }

  function triggerDeleteVehicle() {
    if (!selectedVehicleId) {
      Toast.error({ msg: 'Vehicle Id was not set.' });
      return;
    }
    setDeleteVehicleIsLoading(true);
    dispatch(toAnyAction(deleteVehicle(selectedVehicleId)))
      .then(() => {
        setDeleteVehicleIsVisible(false);
      })
      .finally(() => {
        setDeleteVehicleIsLoading(false);
      });
  }

  function handleChange({ value }: { name: string; value: string | null }) {
    setSearchQuery(value!!);
  }

  const edgeNode = (
    <GappedContainerWith12PX>
      {!!vehicles.length && (
        <UiButton size="md" onClick={openAddVehicle}>
          <UiIcon icon="TruckBold" />
          add new vehicle
        </UiButton>
      )}
    </GappedContainerWith12PX>
  );

  useEffect(() => {
    dispatch(toAnyAction(getVehicles()));
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Vehicles"
        searchQuery={searchQuery}
        edgeNode={edgeNode}
        handleQueryChange={handleChange}
      />
      <Vehicles>
        {sortedVehicles.map((vehicle) => (
          <VehicleItem
            vehicle={vehicle}
            key={vehicle._id}
            openEditVehicle={openEditVehicle}
            openDeleteVehicle={openDeleteVehicle}
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

      <UiConfirmModal
        isVisible={deleteVehicleIsVisible}
        variant="danger"
        title="Delete Vehicle"
        loading={deleteVehicleIsLoading}
        onClose={() => setDeleteVehicleIsVisible(false)}
        onProceed={triggerDeleteVehicle}
      >
        Are you sure you want to delete this vehicle? This process cannot be
        undone.
      </UiConfirmModal>
      <AddVehicle
        isVisible={isAddVehicleVisible}
        key={`${isAddVehicleVisible}-AddVehicle`}
        onClose={closeAddVehicle}
      />

      {selectedVehicle && (
        <EditVehicle
          isVisible={isEditVehicleVisible}
          onClose={closeEditVehicle}
          vehicle={selectedVehicle}
        />
      )}
    </>
  );
}

const GappedContainerWith12PX = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(12)};
`;

const EmptyVehicleContainer = styled.div`
  padding: 0 ${pxToRem(24)};
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
  padding: 0 ${pxToRem(24)};
  padding-top: ${pxToRem(32)};

  @media screen and (min-width: ${sizes.mobileSmall}) {
    display: flex;
    flex-wrap: wrap;
  }
`;

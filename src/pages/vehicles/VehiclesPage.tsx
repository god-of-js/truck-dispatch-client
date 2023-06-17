import { lazy, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { searchObjectsByField, toAnyAction } from 'utils/helpers';
import { getVehicles, deleteVehicle } from 'modules/Vehicle';
import { RootState } from 'modules/index';
import sizes from 'utils/sizes';
import Vehicle from 'types/Vehicle';
import { Toast } from 'utils/toast';

const VehicleItem = lazy(() => import('components/vehicles/VehicleItem'));
const EditVehicle = lazy(() => import('components/vehicles/EditVehicle'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiConfirmModal = lazy(() => import('ui/UiConfirmModal'));
const UiButton = lazy(() => import('ui/UiButton'));
const DashboardTopNav = lazy(() => import('components/layout/DashboardTopNav'));
const AddVehicle = lazy(() => import('components/vehicles/AddVehicle'));

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
  gap:12px;
`;

const EmptyVehicleContainer = styled.div`
  padding: 0 24px;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--color-gray-80);
  font-size:20px;
  max-width:492px;
  margin: auto;
  p {
    text-align: center;
  }
  button {
    padding: 0 28px;
  }

  svg {
    width: 301px;
    height: 80px;
  }
`;

const Vehicles = styled.div`
  display: grid;
  gap:22px;
  padding: 0 24px;
  padding-top:32px;

  @media screen and (min-width: ${sizes.mobileSmall}) {
    display: flex;
    flex-wrap: wrap;
  }
`;

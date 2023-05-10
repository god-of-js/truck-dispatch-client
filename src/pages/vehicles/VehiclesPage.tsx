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
import Vehicle from 'components/vehicles/Vehicle';
import sizes from 'utils/sizes';
import UiIcon from 'ui/UiIcon';

export default function VehiclesPage() {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const [isAddVehicleVisible, setIsAddVehicleVisible] = useState(false);

  function closeAddVehicle() {
    setIsAddVehicleVisible(false);
  }

  function openAddVehicle() {
    setIsAddVehicleVisible(true);
  }

  function edgeChildren() {
    return (
      <GappedContainerWith12PX>
        {!!vehicles.length && (
          <UiButton onClick={openAddVehicle}>add new vehicle</UiButton>
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
          <Vehicle vehicle={vehicle} />
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
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(22)};
  padding-top: ${pxToRem(32)};
`;

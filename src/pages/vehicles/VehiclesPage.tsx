import { useState } from 'react';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import DuoTrucks from '../../assets/img/duo-trucks.svg';
import UiOverlay from 'ui/UiOverlay';
import AddVehicle from 'components/vehicles/AddVehicle';

export default function VehiclesPage() {
  const vehicles = [];
  const [addVehicleIsVisible, setAddVehicleIsVisible] = useState(false)

  function closeAddVehicle() {
    setAddVehicleIsVisible(true);
  }

  function openAddVehicle() {
    setAddVehicleIsVisible(true)
  }

  function edgeChildren() {
    return (
      <GappedContainerWith12PX>
        {!!vehicles.length && <UiButton onClick={openAddVehicle}>add new vehicle</UiButton>}
      </GappedContainerWith12PX>
    );
  }

  return (
    <>
      <DashboardTopNav routeName="Vehicles" edgeChild={edgeChildren()} />

      {!vehicles.length && (
        <EmptyVehicleContainer>
          <img src={DuoTrucks} alt="Truckdispatch trucks" />
          <p>
            You’ve not added any vehicles yet.Load up your trucks in our big
            garage, so you’d be able to bid on jobs
          </p>
          <UiButton onClick={openAddVehicle}>add new vehicle</UiButton>
        </EmptyVehicleContainer>
      )}

      <UiOverlay isVisible={addVehicleIsVisible}>
        <AddVehicle onClose={closeAddVehicle}/>
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
  font-size: ${pxToRem(24)};
  max-width: ${pxToRem(492)};
  margin: auto;
  p {
    text-align: center;
  }
`;

import { useState } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import UiButton from 'ui/UiButton';
import CreateVehicleData from 'types/CreateVehicleData';
import UiIcon from 'ui/UiIcon';
import { vehicleTypes } from 'utils/constants';

interface Props {
  vehicle: CreateVehicleData;
  goToNext: (vehicleData: Partial<CreateVehicleData>) => void;
}
export default function SelectTruckType({ vehicle, goToNext }: Props) {
  const [vehicleData, setVehicleData] = useState(vehicle);

  function selectVehicleType(vehicleType: string) {
    setVehicleData((data) => ({
      ...data,
      vehicleType,
    }));
  }

  function goToNextStep() {
    goToNext(vehicleData);
  }

  return (
    <ComponentStyling>
      <label>Select Truck Type</label>
      <div className="vehicle-grid">
        {vehicleTypes.map((vehicle) => (
          <Vehicle
            isActive={vehicleData.vehicleType === vehicle.title}
            key={vehicle.title}
            onClick={() => selectVehicleType(vehicle.title)}
          >
            <div className="vehicle-inner">
              <UiIcon icon={vehicle.icon} />
              <div>{vehicle.title}</div>
            </div>
          </Vehicle>
        ))}
      </div>
      <div className="btn-container">
        <UiButton
          size="large"
          disabled={!vehicleData.vehicleType}
          onClick={goToNextStep}
        >
          Continue
        </UiButton>
      </div>
    </ComponentStyling>
  );
}

const ComponentStyling = styled.div`
  label {
    font-weight: 700;
    font-size:16px;
    font-family: 'thiccboi-medium';
    color: var(--color-neutralBlack);
  }
  .btn-container {
    display: flex;
    justify-content: center;
    button {
      width:182px;
    }
  }
  .vehicle-grid {
    display: grid;
    grid-template-columns: auto;
    gap:12px;
    margin:24px 0;

    @media screen and (min-width: ${sizes.tabletMidWidth}) {
      grid-template-columns: auto auto auto;
    }
  }
`;

const Vehicle = styled.button`
  padding:1px;
  background: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'var(--color-primary)' : 'transparent'};
  border: transparent;
  outline: none;
  border-radius:8px;
  .vehicle-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:8px;
    cursor: pointer;
    border:1px solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'var(--color-primary)' : 'var(--color-gray)'};
    background: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary-10)' : 'var(--color-gray-20)'};
    border-radius:8px;
    padding:20px 24px;
    color: var(--color-neutralBlack);
    font-size:14px;
    font-weight: 700;
    font-family: 'thiccboi-extrabold';
  }

  svg {
    height:64px;
    width:128px;
  }

  &:hover {
    .vehicle-inner {
      background: var(--color-primary-10);
    }
  }
`;

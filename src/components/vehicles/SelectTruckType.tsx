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
    font-size: ${pxToRem(16)};
    font-family: 'thiccboi-medium';
    color: var(--color-neutralBlack);
  }
  .btn-container {
    display: flex;
    justify-content: center;
    button {
      width: ${pxToRem(182)};
    }
  }
  .vehicle-grid {
    display: grid;
    grid-template-columns: auto;
    gap: ${pxToRem(12)};
    margin: ${pxToRem(24)} 0;

    @media screen and (min-width: ${sizes.tabletMidWidth}) {
      grid-template-columns: auto auto auto;
    }
  }
`;

const Vehicle = styled.button`
  padding: ${pxToRem(1)};
  background: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'var(--color-primary)' : 'transparent'};
  border: transparent;
  outline: none;
  border-radius: ${pxToRem(8)};
  .vehicle-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${pxToRem(8)};
    cursor: pointer;
    border: ${pxToRem(1)} solid
      ${({ isActive }: { isActive: boolean }) =>
        isActive ? 'var(--color-primary)' : 'var(--color-gray)'};
    background: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary-10)' : 'var(--color-gray-20)'};
    border-radius: ${pxToRem(8)};
    padding: ${pxToRem(20)} ${pxToRem(24)};
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(14)};
    font-weight: 700;
    font-family: 'thiccboi-extrabold';
  }

  svg {
    height: ${pxToRem(64)};
    width: ${pxToRem(128)};
  }

  &:hover {
    .vehicle-inner {
      background: var(--color-primary-10);
    }
  }
`;

import { useState } from 'react';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import UiButton from 'ui/UiButton';
import sizes from 'utils/sizes';

interface Props {
  goToNext: (vehicleData: CreateVehicleData) => void;
  vehicle: CreateVehicleData
}
export default function UploadVehicleImages({ vehicle,goToNext }: Props) {
    const [chosenVehicleType, setChosenVehicleType] = useState('');
    return (
      <ComponentStyling>
        <label>Upload Images of your <VehicleType>{vehicle.vehicleType}</VehicleType></label>
        <div className="btn-container">
          <UiButton
            size="large"
            disabled={!chosenVehicleType}
            onClick={() => goToNext({ vehicleType: chosenVehicleType })}
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
  
  const VehicleType = styled.span`
    color: var(--color-primary);
  `;
  
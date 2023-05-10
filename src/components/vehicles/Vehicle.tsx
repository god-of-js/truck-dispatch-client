import { useEffect, useState } from 'react';

import styled from 'styled-components';
import Vehicle from 'types/Vehicle';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';

interface Props {
  vehicle: Vehicle;
  openEditVehicle: (vehicle: Vehicle) => void;
}
export default function VehicleComponent({ vehicle, openEditVehicle }: Props) {
  const images = Object.values(vehicle.images).slice(0, 4);

  function editVehicle() {
    openEditVehicle(vehicle);
  }
  return (
    <VehicleStyling>
      <div className="fields">
        <div className="field">
          <div className="label">DRIVER NAME</div>
          <div className="text-value">{vehicle.driver.name}</div>
        </div>
        <div className="field">
          <div className="label">PHONE NUMBER</div>
          <div className="text-value">{vehicle.driver.phone}</div>
        </div>
      </div>
      <div className="images">
        <div className="label">Truck Images</div>
        <div className="content">
          {/* {images.map((image) => (
            <>
              <img src={image} alt="a truckdispatch vendor vehicle" />
            </>
          ))} */}
        </div>
      </div>
      <div className="btn-container">
        <UiButton variant="secondary" size="large" onClick={editVehicle}>
          Edit truck details
        </UiButton>
        <UiButton variant="danger-secondary" size="large">
          <UiIcon icon="TruckRemove" />
        </UiButton>
      </div>
    </VehicleStyling>
  );
}

const VehicleStyling = styled.div`
  padding: ${pxToRem(24)};
  background: white;
  border-radius: ${pxToRem(16)};
  display: grid;
  gap: ${pxToRem(24)};

  .label {
    font-style: normal;
    font-weight: 400;
    font-family: 'thiccboi-light';
    font-size: ${pxToRem(10)};
    color: var(--color-gray-70);
    margin-bottom: ${pxToRem(12)};
    text-transform: uppercase;
  }

  .fields {
    display: grid;
    gap: ${pxToRem(20)};

    .text-value {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: var(--color-neutralBlack);
      font-family: 'thiccboi-regular';
    }
  }

  .images {
    .content {
      display: grid;
      grid-template-columns: auto auto auto;
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: ${pxToRem(12)};
    button {
      &:first-child {
        width: 90%;
      }
      &:last-child {
        width: ${pxToRem(56)};
      }
    }
  }
`;

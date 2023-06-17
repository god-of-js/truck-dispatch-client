import { lazy, useMemo } from 'react';

import styled from 'styled-components';
import Vehicle from 'types/Vehicle';
import { Icons } from 'ui/UiIcon';
import { vehicleTypes } from 'utils/constants';
import sizes from 'utils/sizes';

const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));

interface Props {
  vehicle: Vehicle;
  openEditVehicle: (vehicle: Vehicle) => void;
  openDeleteVehicle: (vehicleId: string) => void;
}
export default function VehicleComponent({
  vehicle,
  openEditVehicle,
  openDeleteVehicle,
}: Props) {
  const images = Object.values(vehicle.images).slice(0, 4);

  function editVehicle() {
    openEditVehicle(vehicle);
  }
  const iconName = useMemo(() => {
    const typeOfVehicle = vehicleTypes.find(
      ({ title }) => title === vehicle.vehicleType,
    );
    return typeOfVehicle?.icon as Icons;
  }, [vehicle.vehicleType]);

  return (
    <VehicleStyling>
      <div className="driver-avatar-container">
        <img src={vehicle.driver.avatar} width="100" height="100" alt="" />
        <div className="vehicle-type">
          <UiIcon icon={iconName} />
          <div>{vehicle.vehicleType}</div>
        </div>
      </div>
      <div className="plate-number">
        <div className="label">Plate Number</div>
        <div className="plate-number__value">{vehicle.plateNumber}</div>
      </div>
      <div className="fields">
        <div className="field">
          <div className="label">DRIVER NAME</div>
          <div className="text-value driver-name">{vehicle.driver.name}</div>
        </div>
        <div className="field">
          <div className="label">PHONE NUMBER</div>
          <div className="text-value">{vehicle.driver.phone}</div>
        </div>
      </div>
      <div className="images">
        <div className="label">Truck Images</div>
        <div className="content">
          {images.map((image) => (
            <div key={image} className="image">
              <img src={image} alt="a truckdispatch vendor vehicle" />
              <div className="img-remainder">+2</div>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <UiButton variant="secondary" size="large" onClick={editVehicle}>
          Edit truck details
        </UiButton>
        <UiButton
          variant="danger-secondary"
          size="large"
          onClick={() => openDeleteVehicle(vehicle._id)}
        >
          <UiIcon icon="TruckRemove" />
        </UiButton>
      </div>
    </VehicleStyling>
  );
}

const VehicleStyling = styled.div`
  padding: 24px;
  background: white;
  border-radius: 16px;
  display: grid;
  gap: 24px;
  max-width: 372px;

  @media screen and (min-width: ${sizes.mobileSmall}) {
    min-width: 360px;
  }

  .driver-avatar-container {
    display: flex;
    gap: 12px;

    img {
      border-radius: 8px;
      width: 100px;
      height: 100px;
      object-fit: cover;
    }

    .vehicle-type {
      background: var(--color-gray-20);
      border-radius: 8px;
      width: calc(100% - 100px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 24px;
      text-transform: capitalize;
      height: 100px;

      svg {
        height: 40px;
        width: 80px;
      }
    }
  }

  .plate-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    background: var(--color-gray-20);
    border-radius: 8px;

    &__value {
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
    }
  }

  .label {
    font-style: normal;
    font-weight: 400;
    font-family: 'thiccboi-light';
    font-size: 10px;
    color: var(--color-gray-70);
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .fields {
    display: grid;
    gap: 20px;

    .text-value {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: var(--color-neutralBlack);
      font-family: 'thiccboi-regular';
    }
    .driver-name {
      text-transform: capitalize;
    }
  }

  .images {
    .content {
      display: grid;
      grid-template-columns: auto auto;
      gap: 12px;

      .image {
        position: relative;
        width: 100%;
        height: 84px;
        img {
          object-fit: cover;
        }
        .img-remainder {
          display: none;
        }

        &:last-child {
          .img-remainder {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: linear-gradient(
              0deg,
              rgba(21, 19, 27, 0.75),
              rgba(21, 19, 27, 0.75)
            );
            border-radius: 8px;
            color: white;
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 12px;
    button {
      &:first-child {
        width: 90%;
      }
      &:last-child {
        width: 56px;
      }
    }
  }
`;

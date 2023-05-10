import { useMemo } from 'react';
import styled from 'styled-components';
import Vehicle from 'types/Vehicle';
import UiButton from 'ui/UiButton';
import UiIcon, { Icons } from 'ui/UiIcon';
import { vehicleTypes } from 'utils/constants';

interface Props {
  vehicle: Vehicle;
}
export default function VehicleComponent({ vehicle }: Props) {
  const images = Object.values(vehicle.images).slice(0, 4);

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
          {images.map((image) => (
            <div className="image">
              <img src={image} alt="a truckdispatch vendor vehicle" />
              <div className="img-remainder">+2</div>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <UiButton variant="secondary" size="large">
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
  max-width: ${pxToRem(372)};
  min-width: ${pxToRem(360)};


  .driver-avatar-container {
    display: flex;
    gap: ${pxToRem(12)};

    img {
      border-radius: ${pxToRem(8)};
      width: ${pxToRem(100)};
      height: ${pxToRem(100)};
    }

    .vehicle-type {
      background: var(--color-gray-20);
      border-radius: ${pxToRem(8)};
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

      svg {
        height: ${pxToRem(40)};
        width: ${pxToRem(80)};
      }
    }
  }

  .plate-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${pxToRem(16)} ${pxToRem(24)};
    background: var(--color-gray-20);
    border-radius: ${pxToRem(8)};

    &__value {
      letter-spacing: -0.02em;
      color: var(--color-neutralBlack);
      font-style: normal;
      font-weight: 600;
      font-size: ${pxToRem(20)};
    }
  }

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
      grid-template-columns: auto auto;
      gap: ${pxToRem(12)};

      .image {
        position: relative;
        max-width: ${pxToRem(160)};
        width: 100%;
        height: ${pxToRem(84)};
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
            border-radius: ${pxToRem(8)};
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
        border-radius: ${pxToRem(8)};
      }
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

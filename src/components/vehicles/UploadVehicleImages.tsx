import { useMemo, useState } from 'react';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import sizes from 'utils/sizes';

interface Props {
  goToNext: (vehicleData: CreateVehicleData) => void;
  vehicle: CreateVehicleData;
}
export default function UploadVehicleImages({ vehicle, goToNext }: Props) {
  const [vehicleData, setVehicleData] = useState(vehicle);
  const fields: { title: string; key: keyof CreateVehicleData }[] = [
    {
      title: 'Front View',
      key: 'frontViewImg',
    },
    {
      title: 'Side View One',
      key: 'firstSideViewImg',
    },
    {
      title: 'Side View Two',
      key: 'secondSideViewImg',
    },
    {
      title: 'Back View',
      key: 'backViewImg',
    },
    {
      title: "Driver's Cockpit",
      key: 'driverCockpitImg',
    },
    {
      title: 'Back Inner View',
      key: 'backInnerViewImg',
    },
  ];
  const continueBtnIsDisabled = useMemo(() => {
    return true;
  }, [vehicleData]);

  function goToNextStep() {
    goToNext(vehicleData);
  }

  function setData({ name, value }: { name: string; value: File | File[] }) {
    setVehicleData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  return (
    <ComponentStyling>
      <label>
        Upload Images of your <VehicleType>{vehicle.vehicleType}</VehicleType>
      </label>
      <div className="img-grid">
        {fields.map((field) => (
          <div className="img-upload" key={field.key}>
            <FileUploadWidget
              name={field.key}
              value={vehicleData[field.key]}
              onChange={setData}
              styleType="with-drag-and-drop"
            />
            <div className="title">{field.title}</div>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <UiButton
          size="large"
          disabled={continueBtnIsDisabled}
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
    margin-top: ${pxToRem(16)};
    button {
      width: ${pxToRem(182)};
    }
  }
  .img-grid {
    display: grid;
    grid-template-columns: auto;
    grid-auto-rows: 1fr;
    gap: ${pxToRem(12)};
    margin: ${pxToRem(24)} 0;

    .img-upload {
      text-align: center;
      .title {
        font-size: ${pxToRem(14)};
        color: var(--color-neutralBlack);
        font-weight: 700;
        margin-top: ${pxToRem(12)};
      }
    }

    @media screen and (min-width: ${sizes.tabletMidWidth}) {
      grid-template-columns: auto auto auto;
    }
  }
`;

const VehicleType = styled.span`
  color: var(--color-primary);
`;

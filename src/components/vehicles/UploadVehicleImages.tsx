import { lazy, useMemo, useState } from 'react';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import sizes from 'utils/sizes';

const UiButton = lazy(() => import('ui/UiButton'));
const FileUploadWidget = lazy(() => import('ui/FileUploadWidget'));

interface Props {
  goToNext: (vehicleData: CreateVehicleData) => void;
  vehicle: CreateVehicleData;
}
export default function UploadVehicleImages({ vehicle, goToNext }: Props) {
  const [vehicleData, setVehicleData] = useState(vehicle);
  const fields: { title: string; key: keyof CreateVehicleData['images'] }[] = [
    {
      title: 'Front View',
      key: 'frontView',
    },
    {
      title: 'Side View One',
      key: 'leftSideView',
    },
    {
      title: 'Side View Two',
      key: 'rightSideView',
    },
    {
      title: 'Back View',
      key: 'backView',
    },
    {
      title: "Driver's Cockpit",
      key: 'driversCockPit',
    },
    {
      title: 'Back Inner View',
      key: 'backInnerView',
    },
  ];

  const continueBtnIsDisabled = useMemo(() => {
    return fields.some(({ key }) => !vehicleData.images[key]);
  }, [vehicleData]);

  function goToNextStep() {
    goToNext(vehicleData);
  }

  function setData({ name, value }: { name: string; value: File | File[] }) {
    setVehicleData((state) => ({
      ...state,
      images: {
        ...state.images,
        [name]: value,
      },
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
              value={vehicleData.images[field.key]}
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
    grid-auto-rows: ${pxToRem(220)};
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
    .file-upload-widget {
      height: ${pxToRem(180)};
      width: 100%;
      max-height: ${pxToRem(376)};
    }

    @media screen and (min-width: ${sizes.tabletMidWidth}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const VehicleType = styled.span`
  color: var(--color-primary);
`;

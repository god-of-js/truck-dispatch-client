import { useState } from 'react';
import styled from 'styled-components';
import CreateVehicleData from 'types/CreateVehicleData';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import DriverDetailsSchema from 'utils/validations/DriverDetailsSchema';

interface Props {
  finish: (vehicleData: CreateVehicleData) => void;
  loading: boolean;
  vehicle: CreateVehicleData;
}
export default function DriverDetailsForm({ vehicle, loading, finish }: Props) {
  const [formData, setFormData] = useState(vehicle);

  function onChange({
    name,
    value,
  }: {
    name: string;
    value: string | null | File | File[];
  }) {
    if (name.includes('driver')) {
      const subName = name.split('.')[1];
      setFormData((state) => ({
        ...state,
        driver: {
          ...state.driver,
          [subName]: value,
        },
      }));

      return;
    }

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function createVehicle() {
    finish(formData);
  }

  return (
    <ComponentStyling>
      <label>Add Truck and Driver details</label>
      <UiForm
        formData={formData}
        schema={DriverDetailsSchema}
        onSubmit={createVehicle}
      >
        {({ errors }) => (
          <div>
            <div className="grid-container">
              <div className="driver-photo-container">
                <FileUploadWidget
                  label="Driver's Photo"
                  value={formData.driver.avatar}
                  error={errors['driver.avatar']}
                  name="driver.avatar"
                  styleType="with-drag-and-drop"
                  onChange={onChange}
                />
              </div>
              <div className="form-details">
                <UiInput
                  label="Truck Driver's Name"
                  value={formData.driver.name}
                  error={errors['driver.name']}
                  name="driver.name"
                  onChange={onChange}
                />
                <UiInput
                  label="Truck Driver's Phone Number"
                  type="phone"
                  value={formData.driver.phone}
                  error={errors['driver.phone']}
                  name="driver.phone"
                  onChange={onChange}
                />
                <UiInput
                  label="Truck Plate Number"
                  value={formData.plateNumber}
                  error={errors.plateNumber}
                  name="plateNumber"
                  onChange={onChange}
                />
                <FileUploadWidget
                  label="Truck Driver's Driver License"
                  value={formData.driver.driverLicense}
                  error={errors['driver.driverLicense']}
                  name="driver.driverLicense"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="btn-container">
              <UiButton loading={loading}>Finish</UiButton>
            </div>
          </div>
        )}
      </UiForm>
    </ComponentStyling>
  );
}

const ComponentStyling = styled.div`
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(20)};
    margin-top: ${pxToRem(32)};
  }

  label {
    font-weight: 700;
    font-size: ${pxToRem(16)};
    font-family: 'thiccboi-medium';
    color: var(--color-neutralBlack);
  }
  .driver-photo-container {
    .file-upload-widget {
      height: ${pxToRem(376)};
    }
  }
  .form-details {
    display: grid;
    grid-template-columns: auto;
    gap: ${pxToRem(24)};
  }
  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: ${pxToRem(32)};
    button {
      width: ${pxToRem(182)};
    }
  }
`;

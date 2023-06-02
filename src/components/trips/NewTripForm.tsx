import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Trip from 'types/Trip';

import {
  jobTypes,
  shippingLines,
  sizeOfContainer,
  typeOfGoods,
} from 'utils/constants';
import NewTripFormSchema from 'utils/validations/NewTripFormSchema';

import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiSelect from 'ui/UiSelect';
import sizes from 'utils/sizes';
import UiTextArea from 'ui/UiTextArea';
import UiButton from 'ui/UiButton';
import { useSelector } from 'react-redux';
import { selectTrip } from 'modules/Trips';
import NewTrip from 'types/NewTrip';
import UiCard from 'ui/UiCard';

interface Props {
  tripFormData: Trip | NewTrip;
  tripId?: string;
  loading?: boolean;
  nextHandler: (param: NewTrip | Trip) => void;
}
export default function NewTripForm({
  tripFormData,
  tripId,
  nextHandler,
}: Props) {
  const trip = useSelector(selectTrip(tripId || ''));
  const [formData, setFormData] = useState(tripFormData);
  const typeOfGoodsOptions = turnArrayToOptions(typeOfGoods);
  const shippingLinesOptions = turnArrayToOptions(shippingLines);
  const jobTypesOptions = turnArrayToOptions(jobTypes);
  const sizeOfContainerOptions = turnArrayToOptions(sizeOfContainer);

  const editMode = !!tripId;

  function onSubmit() {
    nextHandler(formData);
  }

  function handleChange(event: { name: string; value: string | null }) {
    setFormData((state) => ({
      ...state,
      [event.name]: event.value,
    }));
  }

  function turnArrayToOptions(arr: string[]) {
    return arr.map((value) => ({
      value: value,
      label: value,
    }));
  }

  useEffect(() => {
    if (tripId && trip?._id) {
      setFormData(trip);
    }
  }, [tripId, trip]);

  return (
    <UiForm formData={formData} schema={NewTripFormSchema} onSubmit={onSubmit}>
      {({ errors }) => (
        <FormStyling>
          <UiCard>
            <Heading>Addresses</Heading>
            <GridContainer>
              <UiLocationsInput
                label="Pickup Address(Terminal)"
                name="pickUpAddress"
                value={formData.pickUpAddress}
                error={errors.pickUpAddress}
                onChange={handleChange}
              />
              <UiLocationsInput
                label="Delivery address"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                error={errors.deliveryAddress}
                onChange={handleChange}
              />
            </GridContainer>
          </UiCard>
          <UiCard>
            <Heading>Shipment Dates</Heading>
            <GridContainer>
              <UiInput
                label="Pickup Date"
                name="pickUpDate"
                type="date"
                value={formData.pickUpDate}
                error={errors.deliveryAddress}
                onChange={handleChange}
              />
              {/* TODO: validate that delivery date is past pick up date. */}
              <UiInput
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                error={errors.deliveryAddress}
                onChange={handleChange}
              />
            </GridContainer>
          </UiCard>

          <UiCard>
            <Heading>Merchandise</Heading>
            <GridContainer>
              <UiSelect
                label="Type Of Goods"
                name="typeOfGoods"
                options={typeOfGoodsOptions}
                value={formData.typeOfGoods}
                error={errors.typeOfGoods}
                onChange={handleChange}
              />
              <UiSelect
                label="Shipping Line"
                name="shippingLine"
                options={shippingLinesOptions}
                value={formData.shippingLine || ''}
                error={errors.shippingLine}
                onChange={handleChange}
              />
              <UiSelect
                label="Job Type"
                name="jobType"
                options={jobTypesOptions}
                value={formData.jobType || ''}
                error={errors.jobType}
                onChange={handleChange}
              />
              <UiSelect
                label="Size of Container"
                name="sizeOfContainer"
                options={sizeOfContainerOptions}
                value={formData.sizeOfContainer || ''}
                error={errors.sizeOfContainer}
                onChange={handleChange}
              />
              <UiInput
                label="Weight Of Goods(Tonnage)"
                name="weight"
                type="number"
                value={formData.weight}
                error={errors.weight}
                onChange={handleChange}
              />
            </GridContainer>
            <div className="text-area-container">
              <UiTextArea
                label="Instructions For Goods(optional)"
                name="instructions"
                value={formData.instructions || ''}
                error={errors.description}
                onChange={handleChange}
              />
            </div>
          </UiCard>
          <SubmitButtonContainer>
            <UiButton size="large">
              {' '}
              {editMode ? 'Update' : 'Confirm'} Trip Details
            </UiButton>
          </SubmitButtonContainer>
        </FormStyling>
      )}
    </UiForm>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${pxToRem(20)};
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;

const Heading = styled.h2`
  font-family: 'thiccboi-light';
  font-style: normal;
  font-weight: 400;
  font-size: ${pxToRem(16)};
  line-height: 140%;
  letter-spacing: 0.05em;
  color: var(--color-gray-70);
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  margin-bottom: ${pxToRem(20)};
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${pxToRem(12)};

  button {
    min-width: ${pxToRem(329)};
  }
`;

const FormStyling = styled.div`
  display: grid;
  gap: ${pxToRem(8)};
  padding-top: ${pxToRem(32)};

  .text-area-container {
    padding-top: ${pxToRem(24)};
  }
`;

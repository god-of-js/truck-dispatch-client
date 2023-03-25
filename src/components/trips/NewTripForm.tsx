import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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

interface Props {
  tripFormData: Trip | NewTrip;
  nextHandler: (param: NewTrip | Trip) => void;
}
export default function NewTripForm({ tripFormData, nextHandler }: Props) {
  const { tripId } = useParams();
  const trip = useSelector(selectTrip(tripId || ''));
  const [formData, setFormData] = useState(tripFormData);
  const typeOfGoodsOptions = turnArrayToOptions(typeOfGoods);
  const shippingLinesOptions = turnArrayToOptions(shippingLines);
  const jobTypesOptions = turnArrayToOptions(jobTypes);
  const sizeOfContainerOptions = turnArrayToOptions(sizeOfContainer);

  const { pathname } = useLocation();
  const editMode = pathname.includes('edit');

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
        <div>
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
          <UiTextArea
            label="Instructions For Goods(optional)"
            name="instructions"
            value={formData.instructions || ''}
            error={errors.description}
            onChange={handleChange}
          />
          <SubmitButtonContainer className="submit-button-container">
            <UiButton> {editMode ? 'Update' : 'Confirm'} Trip Details</UiButton>
          </SubmitButtonContainer>
        </div>
      )}
    </UiForm>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${pxToRem(12)};
  margin-bottom: ${pxToRem(12)};

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;

const Heading = styled.h2`
  color: var(--color-gray-600);
  font-size: ${pxToRem(16)};
  margin-top: ${pxToRem(24)};
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${pxToRem(12)};
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiSelect from 'ui/UiSelect';
import sizes from '../../utils/sizes';
import { shippingLines, sizeOfContainer, typeOfGoods } from 'utils/constants';

interface Props {
  defaultFormData: Trip;
}
export default function NewTripForm({ defaultFormData }: Props) {
  const [formData, setFormData] = useState(defaultFormData);
  const formRules = {};
  const typeOfGoodsOptions = turnArrayToOptions(typeOfGoods);
  const shippingLinesOptions = turnArrayToOptions(shippingLines);
  const sizeOfContainerOptions = turnArrayToOptions(sizeOfContainer);

  function onSubmit() {}

  function onChange() {}

  function turnArrayToOptions(arr: string[]) {
    return arr.map((value) => ({
      value: value,
      label: value,
    }));
  }
  return (
    <UiForm formData={formData} rules={formRules} onSubmit={onSubmit}>
      {() => (
        <div>
          <Heading>Addresses</Heading>
          <GridContainer>
            <UiLocationsInput
              label="Pickup Address(Terminal)"
              name="pickUpAddress"
              formData={formData}
              onChange={(data) => setFormData(data as Trip)}
            />
            <UiLocationsInput
              label="Delivery address"
              name="deliveryAddress"
              formData={formData}
              onChange={(data) => setFormData(data as Trip)}
            />
          </GridContainer>
          <Heading>Shipment Dates</Heading>
          <GridContainer>
            <UiInput
              label="Pickup Date"
              name="pickUpDate"
              type="date"
              value={formData.pickUpDate}
              onChange={onChange}
            />
            <UiInput
              label="Delivery Date"
              name="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={onChange}
            />
          </GridContainer>

          <Heading>Merchandise</Heading>
          <GridContainer>
            <UiSelect
              label="Type Of Goods"
              name="pickUpDate"
              options={typeOfGoodsOptions}
              value={formData.pickUpDate}
              onChange={onChange}
            />
            <UiSelect
              label="Type Of Goods"
              name="pickUpDate"
              options={typeOfGoodsOptions}
              value={formData.pickUpDate}
              onChange={onChange}
            />
            <UiSelect
              label="Type Of Goods"
              name="pickUpDate"
              options={typeOfGoodsOptions}
              value={formData.pickUpDate}
              onChange={onChange}
            />
            <UiInput
              label="Delivery Date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={onChange}
            />
          </GridContainer>
        </div>
      )}
    </UiForm>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 12px;
  margin-bottom: 12px;

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;

const Heading = styled.h2`
  color: var(--color-gray-600);
  font-size: ${pxToRem(16)};
  margin-top: ${pxToRem(24)};
`;

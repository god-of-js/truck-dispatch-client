import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Trip from 'types/Trip';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiSelect from 'ui/UiSelect';
import sizes from '../../utils/sizes';
import { shippingLines, sizeOfContainer, typeOfGoods } from 'utils/constants';
import UiTextArea from 'ui/UiTextArea';
import UiButton from 'ui/UiButton';

interface Props {
  defaultFormData: Trip;
}
export default function NewTripForm({ defaultFormData }: Props) {
  const [formData, setFormData] = useState(defaultFormData);
  const formRules = {};
  const typeOfGoodsOptions = turnArrayToOptions(typeOfGoods);
  const shippingLinesOptions = turnArrayToOptions(shippingLines);
  const sizeOfContainerOptions = turnArrayToOptions(sizeOfContainer);

  function onSubmit() {
    console.log(formData);
  }

  const pickUpAdressKey = useMemo(() => {
    return JSON.stringify({ ...formData, pickUpAddress: undefined});
  }, [
    formData
  ]);

  const deliveryAdressKey = useMemo(() => {
    return JSON.stringify({ ...formData, deliveryAddress: undefined});
  }, [
    formData
  ]);
  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

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
              key={pickUpAdressKey}
              label="Pickup Address(Terminal)"
              name="pickUpAddress"
              formData={formData}
              onChange={(data) => setFormData(data as Trip)}
            />
            <UiLocationsInput
              key={deliveryAdressKey}
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
              onChange={handleChange}
            />
            <UiInput
              label="Delivery Date"
              name="deliveryDate"
              type="date"
              value={formData.deliveryDate}
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
              onChange={handleChange}
            />
            <UiSelect
              label="Shipping Line"
              name="shippingLine"
              options={shippingLinesOptions}
              value={formData.shippingLine || ''}
              onChange={handleChange}
            />
            <UiSelect
              label="Size of Container"
              name="sizeOfContainer"
              options={sizeOfContainerOptions}
              value={formData.sizeOfContainer || ''}
              onChange={handleChange}
            />
            <UiInput
              label="Weight Of Goods(Tonnage)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </GridContainer>
          <UiTextArea
            label="Description Of Goods"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
          <SubmitButtonContainer className="submit-button-container">
            <UiButton notFullWidth>
              Confirm Trip Details
            </UiButton>
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
  padding-top: ${pxToRem(12)}
`
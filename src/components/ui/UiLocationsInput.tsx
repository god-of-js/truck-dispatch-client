import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UiButton from './UiButton';
import UiField from './UiField';
import UiInput from './UiInput';

interface Props {
  label?: string;
  name: string;
  error?: string;
  value: string;
  onChange: (event: { name: string; value: string | null }) => void;
}

export default function UiLocationsInput({
  label,
  name,
  value,
  error,
  onChange,
}: Props) {
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [cantFindLocation, setCantFindLocation] = useState(false);

  const options = {
    componentRestrictions: { country: 'ng' },
    // If additional fields are needed, they can be gotten from https://developers.google.com/maps/documentation/places/web-service/place-data-fields
    fields: ['formatted_address'],
    types: ['establishment'],
  };

  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.value = value;
    }
    //   @ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current!,
      options,
    );
    // @ts-ignore
    autoCompleteRef.current.addListener('place_changed', async function () {
      // @ts-ignore
      const place = await autoCompleteRef.current.getPlace();
      onChange({ name, value: place.formatted_address });
    });
  }, [value]);

  return (
    <UiField label={label} name={name} error={error}>
      <input className="global-input full-radius" ref={inputRef} key={value} />
      <UiInputContainer>
        {cantFindLocation && (
          <UiInput
            value={value}
            name={name}
            onChange={onChange}
            label={'Enter Location for ' + label}
          />
        )}
      </UiInputContainer>
      <ButtonContainer>
        <UiButton
          variant="primary-text"
          size="text"
          type="button"
          onClick={() => setCantFindLocation(!cantFindLocation)}
        >
          {' '}
          {cantFindLocation ? 'Cancel' : "Can't find location?"}
        </UiButton>
      </ButtonContainer>
    </UiField>
  );
}

const UiInputContainer = styled.div`
  margin-top: ${pxToRem(8)};
`;

const ButtonContainer = styled.div`
  button {
    margin-top: 0;
  }
`;

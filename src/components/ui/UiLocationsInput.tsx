import Api from 'Api';
import { useEffect, useRef } from 'react';
import { useTransition } from 'react';
import { useState } from 'react';
import UiField from './UiField';
import UiInput from './UiInput';
interface Props {
  label?: string;
  name: string;
  value: string;
  error?: string;
  onChange: (event: { name: string; value: string | null }) => void;
}
export default function UiLocationsInput({
  label,
  name,
  value,
  error,
  onChange,
}: Props) {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: 'ng' },
    fields: ['address_components', 'geometry', 'icon', 'name'],
    types: ['establishment'],
  };
  useEffect(() => {
    //   @ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );
    // @ts-ignore
    autoCompleteRef.current.addListener('place_changed', async function () {
      // @ts-ignore
      const place = await autoCompleteRef.current.getPlace();
      // TODO: format to the needed type
      console.log({ name, value: place.name });
      onChange({ name, value: place.name });
    });
  }, []);

  return (
    <UiField label={label} name={name} error={error}>
      <input className="global-input" ref={inputRef as any} />
    </UiField>
  );
}

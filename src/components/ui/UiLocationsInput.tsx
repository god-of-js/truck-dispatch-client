import { useEffect, useLayoutEffect, useRef } from 'react';
import UiField from './UiField';

interface Props {
  label?: string;
  name: string;
  error?: string;
  onChange: (event: { name: string; value: string }) => void;
}
export default function UiLocationsInput({
  label,
  name,
  error,
  onChange,
}: Props) {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: 'ng' },
    // If additional fields are needed, they can be gotten from https://developers.google.com/maps/documentation/places/web-service/place-data-fields
    fields: ['formatted_address'],
    types: ['establishment'],
  };

  useLayoutEffect(() => {
    // TODO: implement prefilling of google input.
    // if (inputRef.current?.value) inputRef.current?.value = formData[name] || '';
    //   @ts-ignore
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );
    // @ts-ignore
    autoCompleteRef.current.addListener('place_changed', async function () {
      // @ts-ignore
      const place = await autoCompleteRef.current.getPlace();
      // TODO: correct transporter verification
      onChange({ name, value: place.formatted_address });
    });
  }, []);

  return (
    <UiField label={label} name={name} error={error}>
      <input className="global-input" ref={inputRef as any} />
    </UiField>
  );
}

import { useEffect, useRef } from 'react';
import UiField from './UiField';

interface Props {
  label?: string;
  name: string;
  error?: string;
  value: string;
  onChange: (event: { name: string; value: string }) => void;
}

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQxjDeHDJjJgpH3dAEI-UsVODM58A3iEI&libraries=places&callback=initMap" async></script>
export default function UiLocationsInput({
  label,
  name,
  value,
  error,
  onChange,
}: Props) {
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const options = {
    componentRestrictions: { country: 'ng' },
    // If additional fields are needed, they can be gotten from https://developers.google.com/maps/documentation/places/web-service/place-data-fields
    fields: ['formatted_address'],
    types: ['establishment'],
  };

  useEffect(() => {
    // TODO: implement prefilling of google input.
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
      // TODO: correct transporter verification
      onChange({ name, value: place.formatted_address });
    });
  }, [value]);

  return (
    <UiField label={label} name={name} error={error}>
      <input className="global-input" ref={inputRef} key={value} />
    </UiField>
  );
}

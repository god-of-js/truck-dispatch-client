// google places location input
import { useEffect, useRef } from 'react';
import UiField from './UiField';

interface Detail {
  long_name: string;
  short_name: string;
  types: string[]
}
interface Props {
  label?: string;
  name: string;
  error?: string;
  formData: Record<string, any>;
  onChange: (event: Record<string, any>) => void;
}
export default function UiLocationsInput({
  label,
  name,
  formData,
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
  function formatPlaceName(name: string,placeDetails: Detail[]) {
    console.log({ name, placeDetails})
  }
  useEffect(() => {
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

      formatPlaceName(place.name,place.address_components);
      // TODO: format to the needed type
      onChange({ ...formData, [name]: place.name });
    });
  }, []);

  return (
    <UiField label={label} name={name} error={error}>
      <input className="global-input" ref={inputRef as any} />
    </UiField>
  );
}

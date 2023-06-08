import styled from 'styled-components';

interface Props {
  value: boolean;
  onChange: (value?: boolean) => void;
}
export default function UiCheckbox({ value, onChange }: Props) {
  return (
    <CheckBox
      type="checkbox"
      checked={value}
      onKeyDown={() => onChange(!value)}
      onClick={() => onChange(!value)}
    />
  );
}

const CheckBox = styled.input`
  appearance: none;
  background: transparent;
  border: 1px solid var(--color-primary);
  width: 16px;
  height: 16px;
  border-radius: ${pxToRem(4)};
  position: relative;
  margin: 0;

  &:checked {
    border-radius: 16px;
    border-width: ${pxToRem(6)};
  }
`;

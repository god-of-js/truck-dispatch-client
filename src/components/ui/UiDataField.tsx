import styled from 'styled-components';

type Variant = 'text-area' | 'field';
interface Props {
  title: string;
  value?: string;
  variant?: Variant;
}
export default function UiDataField({ title, value, variant = 'field' }: Props) {
  return (
    <FieldStyling variant={variant}>
      <div className="field-title">{title}</div>
      <div className="field-value">{value ? value : 'N/A'}</div>
    </FieldStyling>
  );
}

interface StylingProps {
    variant: Variant
}
const FieldStyling = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(16)};
  background: var(--color-gray-20);
  border-radius: ${pxToRem(8)};

  .field-title {
    font-style: normal;
    font-weight: ${({ variant}: StylingProps) => variant === 'text-area' ? 600 : 400 };
    font-size: ${pxToRem(10)};
    line-height: 140%;
    letter-spacing: 0.05em;
    color: ${({ variant}: StylingProps) => variant === 'text-area' ? 'var(--color-neutralBlack)': 'var(--color-gray-70)'};
    text-transform: uppercase;
  }
  .field-value {
    font-style: normal;
    font-weight: ${({ variant}: StylingProps) => variant === 'text-area' ? 400 : 600 };
    font-size: ${pxToRem(16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    margin-top: ${pxToRem(4)};
  }
`;

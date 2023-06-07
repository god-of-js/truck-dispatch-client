import React from 'react';
import styled from 'styled-components';

type Variant = 'text-area' | 'field';
type Sizes = 's' | 'l';
interface Props {
  title: string;
  value?: React.ReactNode;
  variant?: Variant;
  size?: Sizes;
  isBordered?: boolean;
}
export default function UiDataField({
  title,
  value,
  isBordered,
  variant = 'field',
  size = 'l',
}: Props) {
  return (
    <FieldStyling
      variant={variant}
      className="ui-data-field"
      isBordered={isBordered}
      size={size}
    >
      <div className="field-title">{title}</div>
      <div className="field-value">{value ? value : 'N/A'}</div>
      {/* TODO: immplement view more */}
      {/* <UiButton textCasing='lowercase' variant='primary-text' size='large'>view more</UiButton> */}
    </FieldStyling>
  );
}

interface StylingProps {
  variant: Variant;
  size: Sizes;
  isBordered?: boolean;
}
const FieldStyling = styled.div<StylingProps>`
  padding: ${({ size }) => pxToRem(size === 's' ? 12 : 16)} ${pxToRem(16)};
  background: var(--color-gray-20);
  border-radius: ${pxToRem(8)};
  ${({ isBordered }) =>
    isBordered && `border: ${pxToRem(1)} solid var(--color-gray-30);`}
  ${({ variant }) => variant === 'text-area' && `min-height: ${pxToRem(100)}`};

  .field-title {
    font-style: normal;
    font-weight: ${({ variant }) => (variant === 'text-area' ? 600 : 400)};
    font-size: ${pxToRem(10)};
    line-height: 140%;
    letter-spacing: 0.05em;
    color: ${({ variant }) =>
      variant === 'text-area'
        ? 'var(--color-neutralBlack)'
        : 'var(--color-gray-70)'};
    text-transform: uppercase;
  }
  .field-value {
    font-style: normal;
    font-weight: ${({ variant }) => (variant === 'text-area' ? 400 : 600)};
    font-size: ${({ size }) => pxToRem(size === 's' ? 14 : 16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    margin-top: ${pxToRem(4)};
  }

  button {
    padding: 0;
  }
`;

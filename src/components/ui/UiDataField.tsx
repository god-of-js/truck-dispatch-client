import React from 'react';
import styled from 'styled-components';
import UiIcon, { Icons } from './UiIcon';

type Variant = 'text-area' | 'field';
type Sizes = 's' | 'l';
interface Props {
  title: string;
  value?: React.ReactNode;
  variant?: Variant;
  size?: Sizes;
  isBordered?: boolean;
  icon?: Icons;
}
export default function UiDataField({
  title,
  value,
  isBordered,
  variant = 'field',
  size = 'l',
  icon,
}: Props) {
  return (
    <FieldStyling
      variant={variant}
      className="ui-data-field"
      isBordered={isBordered}
      size={size}
    >
      {icon && <UiIcon icon={icon} />}
      <div className="ui-data-field__inner">
        <div className="field-title">{title}</div>
        <div className="field-value">{value ? value : 'N/A'}</div>
      </div>
    </FieldStyling>
  );
}

interface StylingProps {
  variant: Variant;
  size: Sizes;
  isBordered?: boolean;
}
const FieldStyling = styled.div<StylingProps>`
  padding: ${({ size }) => size === 's' ? '12px' : '16px'} 16px;
  background: var(--color-gray-20);
  border-radius:8px;
  display: flex;
  gap:12px;
  ${({ isBordered }) =>
    isBordered && `border:1px solid var(--color-gray-30);`}
  ${({ variant }) => variant === 'text-area' && 'min-height: 100px'};

  .field-title {
    font-style: normal;
    font-weight: ${({ variant }) => (variant === 'text-area' ? 600 : 400)};
    font-size:10px;
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
    font-size: ${({ size }) => size === 's' ? '14px' : '16px'};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    margin-top:4px;
  }

  button {
    padding: 0;
  }
`;
